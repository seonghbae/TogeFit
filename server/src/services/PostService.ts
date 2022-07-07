import { postModel, PostModel, PostInfo, CommentInfo } from '../db';

class PostService {
  constructor(private postModel: PostModel) {}

  async addPost(postInfo: PostInfo) {
    const createdNewPost = await this.postModel.create(postInfo);
    return createdNewPost;
  }

  async deletePost(postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾을 수 없습니다.');
    }

    const result = await this.postModel.deletePost(postId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }

  async updatePost(postId: string, postInfo: Partial<PostInfo>) {
    const updatedPost = await this.postModel.update(postId, postInfo);
    return updatedPost;
  }
}

const postService = new PostService(postModel);

export { postService };
