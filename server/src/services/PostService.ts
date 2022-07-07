import { postModel, PostModel, PostInfo, CommentInfo } from '../db';

class PostService {
  constructor(private postModel: PostModel) {}

  async addPost(postInfo: PostInfo) {
    const createdNewPost = await this.postModel.create(postInfo);
    return createdNewPost;
  }
}

const postService = new PostService(postModel);

export { postService };
