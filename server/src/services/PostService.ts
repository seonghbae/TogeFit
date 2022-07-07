import { postModel, PostModel, PostInfo, CommentInfo } from '../db';

class PostService {
  constructor(private postModel: PostModel) {}

  async addPost(postInfo: PostInfo) {
    const createdNewPost = await this.postModel.create(postInfo);
    return createdNewPost;
  }

  async updatePost(postId: string, postInfo: Partial<PostInfo>) {
    const updatedPost = await this.postModel.update(postId, postInfo);
    return updatedPost;
  }
}

const postService = new PostService(postModel);

export { postService };
