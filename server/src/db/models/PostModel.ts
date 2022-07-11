import { model } from 'mongoose';
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

export class PostModel {
  async findAll() {
    const postListAll = await Post.find({});
    return postListAll;
  }

  async findById(id: string) {
    const post = await Post.findOne({ _id: id });
    return post;
  }

  async findByUserId(userId: string) {
    const postList = await Post.find({ userId });
    return postList;
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
}

const postModel = new PostModel();

export { postModel };
