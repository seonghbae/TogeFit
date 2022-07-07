import { model } from 'mongoose';
import { PostSchema } from '../schemas/PostSchema';

const Post = model('posts', PostSchema);

export interface CommentInfo {
  content: string;
  author: string;
}

export interface PostInfo {
  userId: string;
  contents: string;
  post_image?: string;
  like: number;
  comments: CommentInfo[];
  meal?: string;
  routine?: string;
}

export class PostModel {
  async findById(id: string) {
    const post = await Post.findOne({ _id: id });
    return post;
  }

  async create(postInfo: PostInfo) {
    const createdNewPost = await Post.create(postInfo);
    return createdNewPost;
  }

  async deletePost(postId: string) {
    const { deletedCount } = await Post.deleteOne({ _id: postId });
    return { deletedCount };
  }
}

const postModel = new PostModel();

export { postModel };
