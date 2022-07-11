import { postModel, PostModel, PostInfo, CommentInfo } from '../db';

class PostService {
  constructor(private postModel: PostModel) {}

  async getAllPost() {
    const postListAll = await this.postModel.findAll();
    return postListAll;
  }

  async getPostById(postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  async getPostListByUserId(userId: string) {
    const postList = await this.postModel.findByUserId(userId);
    return postList;
  }

  async addPost(postInfo: PostInfo) {
    const createdNewPost = await this.postModel.create(postInfo);
    return createdNewPost;
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾을 수 없습니다.');
    }

    if (post.userId !== userId) {
      throw new Error('작성자만 삭제할 수 있습니다.');
    }

    const result = await this.postModel.deletePost(postId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }

  async updatePost(
    userId: string,
    postId: string,
    postInfo: Partial<PostInfo>
  ) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾을 수 없습니다.');
    }

    if (post.userId !== userId) {
      throw new Error('작성자만 수정할 수 있습니다.');
    }

    const updatedPost = await this.postModel.update(postId, postInfo);

    if (!updatedPost) {
      throw new Error('수정에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return updatedPost;
  }

  async addComment(postId: string, commentInfo: CommentInfo) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾을 수 없습니다.');
    }

    const result = await this.postModel.addComment(postId, commentInfo);

    if (!result) {
      throw new Error('댓글 작성에 실패했습니다.');
    }

    return result;
  }

  async updateComment(
    commentId: string,
    userId: string,
    toUpdateContent: string
  ) {
    const comment = await this.postModel.findCommentByCommentId(commentId);

    if (!comment) {
      throw new Error('해당 댓글이 존재하지 않습니다.');
    }

    if (comment.author !== userId) {
      throw new Error('작성자만 수정할 수 있습니다.');
    }

    const result = await this.postModel.updateComment(
      commentId,
      toUpdateContent
    );

    if (!result) {
      throw new Error('댓글 수정에 실패했습니다.');
    }

    return result;
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.postModel.findCommentByCommentId(commentId);

    if (!comment) {
      throw new Error('해당 댓글이 존재하지 않습니다.');
    }

    if (comment.author !== userId) {
      throw new Error('작성자만 삭제할 수 있습니다.');
    }

    const result = await this.postModel.deleteComment(commentId);

    if (!result) {
      throw new Error('댓글 삭제에 실패했습니다.');
    }

    return result;
  }
}

const postService = new PostService(postModel);

export { postService };
