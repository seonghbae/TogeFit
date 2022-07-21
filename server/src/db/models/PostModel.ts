import mongoose, { model } from 'mongoose';
import { getCurrentAndNextMonth } from '../../utils';
import { PostSchema } from '../schemas/PostSchema';

const Post = model('posts', PostSchema);

export interface CommentInfo {
  content: string;
  userId: string;
  nickname: string;
}

export interface TagInfo {
  tag: string;
}

export interface PostInfo {
  userId: string;
  contents: string;
  post_image?: string[];
  is_open?: boolean;
  tag_list?: TagInfo[];
  meal?: string;
  routine?: string;
}

export interface DateInfo {
  year: number;
  month: number;
}

export interface ConditionInfo {
  limit: number;
  reqNumber: number;
}

export class PostModel {
  async findAll(conditions: ConditionInfo) {
    const postListAll = await Post.find({})
      .skip(conditions.reqNumber * conditions.limit)
      .sort({ _id: -1 })
      .limit(conditions.limit);

    return postListAll;
  }

  async findById(id: string) {
    const post = await Post.aggregate([
      // 1. id로 해당 데이터 검색
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      // 2. meal object ID로 meal 데이터 찾기
      {
        $lookup: {
          from: 'meals',
          localField: 'meal',
          foreignField: '_id',
          as: 'meal_info',
        },
      },
      { $addFields: { meal_createdAt: '$meal_info.createdAt' } },
      {
        $unwind: { path: '$meal_createdAt', preserveNullAndEmptyArrays: true },
      },
      { $set: { meal_info: '$meal_info.meals.meal_list' } },

      // 3. routine object ID로 routine 데이터 찾기
      {
        $lookup: {
          from: 'routines',
          localField: 'routine',
          foreignField: 'routines._id',
          as: 'routine_info',
        },
      },
      { $set: { routine_info: '$routine_info.routines' } },
      { $unwind: { path: '$routine_info', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$meal_info', preserveNullAndEmptyArrays: true } },

      // 4. meal object ID, routine object ID가 필요 없으므로 표시하지 않음.
      {
        $project: {
          meal: 0,
        },
      },
    ]);

    // meal, routine 데이터를 찾지 못하는 경우 빈 배열 반환
    if (post[0] && !post[0].meal_info) {
      post[0].meal_info = [];
    }

    if (post[0] && !post[0].routine_info) {
      post[0].routine_info = [];
    }

    return post[0];
  }

  async findByUserId(userId: string) {
    const postList = await Post.find({ userId });
    return postList;
  }

  async findByDate(userId: string, date: DateInfo, conditions: ConditionInfo) {
    const { current, next } = getCurrentAndNextMonth(date.year, date.month);

    const filter = {
      $and: [
        { userId: userId },
        {
          createdAt: {
            $gte: new Date(`${current.year}-${current.month}-01`).toISOString(),
            $lt: new Date(`${next.year}-${next.month}-01`).toISOString(),
          },
        },
      ],
    };

    const postList = await Post.find(filter)
      .skip(conditions.reqNumber * conditions.limit)
      .sort({ _id: -1 })
      .limit(conditions.limit);

    return postList;
  }

  async findCommentByCommentId(commentId: string) {
    const post = await Post.findOne(
      {
        'comments._id': commentId,
      },
      { 'comments.$': 1 }
    );
    const comment = post?.comments[0];

    return comment;
  }

  async findByMonth(userId: string, year: number, month: number) {
    const { current, next } = getCurrentAndNextMonth(year, month);

    const filter = {
      $and: [
        { userId: userId },
        {
          createdAt: {
            $gte: new Date(`${current.year}-${current.month}-01`).toISOString(),
            $lt: new Date(`${next.year}-${next.month}-01`).toISOString(),
          },
        },
      ],
    };

    // UTC 기준 + 9시간
    const list = await Post.find(filter).sort({ createdAt: 1 });
    const dateList = list
      .filter((e) => {
        const createdAtTime = e.createdAt as Date;
        const date = new Date(createdAtTime);
        date.setTime(date.getTime() + 9 * 60 * 60 * 1000);
        if (date.getMonth() + 1 == month) {
          return date.getDate();
        }
      })
      .map((e) => {
        return e.createdAt?.getDate();
      });

    return Array.from(new Set(dateList));
  }

  async searchTag(tag: string, conditions: ConditionInfo) {
    if (!tag) {
      const postListAll = await this.findAll(conditions);
      return postListAll;
    }
    const postListByTag = await Post.find({
      tag_list: {
        $elemMatch: { tag: { $regex: `.*${tag}.*` } },
      },
    })
      .skip(conditions.reqNumber * conditions.limit)
      .sort({ _id: -1 })
      .limit(conditions.limit);

    return postListByTag;
  }

  async create(postInfo: PostInfo) {
    const createdNewPost = await Post.create(postInfo);
    return createdNewPost;
  }
  async deletePost(postId: string) {
    const { deletedCount } = await Post.deleteOne({ _id: postId });
    return { deletedCount };
  }

  async update(postId: string, postInfo: Partial<PostInfo>) {
    const filter = { _id: postId };
    const updatedPost = await Post.findOneAndUpdate(filter, postInfo, {
      returnOriginal: false,
    });
    return updatedPost;
  }

  async updateLike(postId: string, nextLikeNumber: number) {
    const filter = { _id: postId };
    const updatedPost = await Post.findByIdAndUpdate(
      filter,
      {
        like: nextLikeNumber,
      },
      { new: true }
    );
    return updatedPost;
  }

  async addComment(postId: string, commentInfo: CommentInfo) {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: commentInfo },
      },
      { returnOriginal: false }
    );

    return updatedPost;
  }

  async updateComment(commentId: string, toUpdateContent: string) {
    const updatedPost = await Post.findOneAndUpdate(
      { 'comments._id': commentId },
      {
        $set: {
          'comments.$.content': toUpdateContent,
        },
      },
      { returnOriginal: false }
    );

    return updatedPost;
  }

  async deleteComment(commentId: string) {
    const updatedPost = await Post.findOneAndUpdate(
      { 'comments._id': commentId },
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { returnOriginal: false }
    );

    return updatedPost;
  }
}

const postModel = new PostModel();

export { postModel };
