import {
  postModel,
  PostModel,
  PostInfo,
  CommentInfo,
  DateInfo,
  ConditionInfo,
} from '../db';

interface ErrorWithStatus {
  status?: number;
  message: string;
  stack?: string;
}

class PostService {
  constructor(private postModel: PostModel) {}

  async getAllPost(conditions: ConditionInfo) {
    const postListAll = await this.postModel.findAll(conditions);
    return postListAll;
  }

  async getPostById(postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 게시글을 찾지 못했습니다.');
    }

    return post;
  }

  async getPostListByDate(
    userId: string,
    date: DateInfo,
    conditions: ConditionInfo
  ) {
    const postList = await this.postModel.findByDate(userId, date, conditions);

    return postList;
  }

  async getDateList(userId: string, year: number, month: number) {
    if (!(month >= 1 && month <= 12)) {
      throw new Error('월의 범위는 1~12입니다.');
    }

    const dateList = await this.postModel.findByMonth(userId, year, month);
    return dateList;
  }

  async searchPost(tag: string, conditions: ConditionInfo) {
    if (conditions.limit < 0 || conditions.reqNumber < 0) {
      throw new Error('잘못된 조건입니다.');
    }

    const postList = await this.postModel.searchTag(tag, conditions);
    return postList;
  }

  async addPost(postInfo: PostInfo) {
    const createdNewPost = await this.postModel.create(postInfo);
    return createdNewPost;
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾지 못했습니다.');
    }

    if (post.userId !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 삭제할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    const result = await this.postModel.deletePost(postId);

    return result;
  }

  async updatePost(
    userId: string,
    postId: string,
    postInfo: Partial<PostInfo>
  ) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾지 못했습니다.');
    }

    if (post.userId !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 수정할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    const updatedPost = await this.postModel.update(postId, postInfo);

    return updatedPost;
  }

  async updateLike(postId: string, mode: string) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error('해당 글을 찾지 못했습니다.');
    }

    let nextLikeNumber = mode === 'plus' ? post.like + 1 : post.like - 1;

    if (nextLikeNumber < 0) {
      nextLikeNumber = 0;
    }

    const updatedPost = await this.postModel.updateLike(postId, nextLikeNumber);

    return updatedPost;
  }

  async addComment(postId: string, commentInfo: CommentInfo) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('해당 글을 찾지 못했습니다.');
    }

    const result = await this.postModel.addComment(postId, commentInfo);

    return result;
  }

  async updateComment(
    commentId: string,
    userId: string,
    toUpdateContent: string
  ) {
    const comment = await this.postModel.findCommentByCommentId(commentId);

    if (!comment) {
      throw new Error('해당 댓글을 찾지 못했습니다.');
    }

    if (comment.author !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 수정할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    const result = await this.postModel.updateComment(
      commentId,
      toUpdateContent
    );

    return result;
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.postModel.findCommentByCommentId(commentId);

    if (!comment) {
      throw new Error('해당 댓글을 찾지 못했습니다.');
    }

    if (comment.author !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 삭제할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    const result = await this.postModel.deleteComment(commentId);

    return result;
  }
}

const postService = new PostService(postModel);

export { postService };
