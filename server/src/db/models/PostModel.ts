import mongoose, { model } from 'mongoose';
import { PostSchema } from '../schemas/PostSchema';

const Post = model('posts', PostSchema);

export interface CommentInfo {
  content: string;
  author: string;
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

export interface CommentInfo {
  author: string;
  content: string;
}

export interface DateInfo {
  year: string;
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
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'meals',
          localField: 'meal',
          foreignField: '_id',
          as: 'meal_info',
        },
      },
      { $set: { meal_info: '$meal_info.meals.meal_list' } },
      {
        $lookup: {
          from: 'routines',
          localField: 'routine',
          foreignField: '_id',
          as: 'routine_info',
        },
      },
      { $set: { routine_info: '$routine_info.routines' } },
      { $unwind: { path: '$meal_info', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$routine_info', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          meal: 0,
          routine: 0,
        },
      },
    ]);

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
    const currentMonth =
      date.month < 10 ? '0' + date.month : String(date.month);
    const nextMonth = date.month + 1 > 12 ? String(1) : String(date.month + 1);

    const filter = {
      $and: [
        { userId: userId },
        {
          createdAt: {
            $gte: new Date(`${date.year}-${currentMonth}-01`).toISOString(),
            $lt: new Date(`${date.year}-${nextMonth}-01`).toISOString(),
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
    const list = await Post.find({
      $and: [
        { userId },
        {
          createdAt: {
            $gt: new Date(year, month - 1),
            $lt: new Date(year, month),
          },
        },
      ],
    }).sort({ createdAt: 1 });
    const dateList = list.map((e) => {
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

  async updateLike(postId: string, currentLikeNumber: number) {
    const filter = { _id: postId };
    const updatedPost = await Post.findByIdAndUpdate(
      filter,
      {
        like: currentLikeNumber + 1,
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
