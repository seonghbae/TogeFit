import * as db from './utils/db';
import { postService } from '../src/services';
import { CommentInfo } from '../src/db/models/PostModel';

let tags = [{ tag: 'tag' }];
let postId: string = '';
let commentId: string = '';

beforeAll(async () => {
  await db.connect();

  // id가 test인 게시글 5개
  for (let i = 0; i < 5; i++) {
    const post = await postService.addPost({
      userId: 'test',
      contents: 'test contents',
      post_image: ['test.png'],
      tag_list: tags,
    });
    postId = post._id.toString();
  }

  // id가 test0~4인 게시글 5개
  for (let i = 0; i < 5; i++) {
    const post = await postService.addPost({
      userId: `test${i}`,
      contents: `test contents`,
      post_image: ['test.png'],
      tag_list: tags,
    });
  }
});
afterAll(async () => await db.close());

describe('게시글 불러오기 TEST', () => {
  test('전체 게시글 불러오기 성공', async () => {
    const conditions = {
      limit: 5,
      reqNumber: 0,
    };
    const postList = await postService.getAllPost(conditions);
    expect(Array.isArray(postList)).toBe(true);
    expect(postList.length).toBeLessThanOrEqual(conditions.limit);
  });

  test('ObjectId로 한 개의 게시글 불러오기 성공', async () => {
    const post = await postService.getPostById(postId);
    expect(post._id.toString()).toEqual(postId);
    expect(post.contents).toEqual('test contents');
  });

  test('ObjectId로 한 개의 게시글 불러오기 실패 - 잘못된 형식의 ID', async () => {
    const failPostId = 'test';
    await expect(postService.getPostById(failPostId)).rejects.toThrow();
  });

  test('ObjectId로 한 개의 게시글 불러오기 실패 - 존재하지 않는 게시글', async () => {
    const failPostId = '62cb8bdea66d590b2d4d538d';
    await expect(postService.getPostById(failPostId)).rejects.toThrow(
      '해당 게시글을 찾지 못했습니다.'
    );
  });

  test('게시글 가져오기(페이지네이션) 성공', async () => {
    const userId = 'test';
    const date = {
      year: new Date().getFullYear().toString(),
      month: Number(new Date().getMonth()) + 1,
    };
    const conditions = { limit: 5, reqNumber: 0 };
    const postList = await postService.getPostListByDate(
      userId,
      date,
      conditions
    );
    expect(postList.length).toBe(5);
  });

  test('게시글 가져오기(페이지네이션) 실패 - 월의 범위(1~12)를 벗어난 경우', async () => {
    const userId = 'test';
    const date = { year: '2022', month: 17 };
    const conditions = { limit: 5, reqNumber: 0 };
    await expect(
      postService.getPostListByDate(userId, date, conditions)
    ).rejects.toThrow();
  });

  test('게시글 쓴 날짜 가져오기(잔디 API) 성공', async () => {
    const userId = 'test';
    const year = Number(new Date().getFullYear());
    const month = Number(new Date().getMonth()) + 1;

    const postList = await postService.getDateList(userId, year, month);
    expect(Array.isArray(postList)).toBe(true);
    expect(postList).toContain(Number(new Date().getDate()));
  });

  test('게시글 쓴 날짜 가져오기(잔디 API) 실패 - 월의 범위(1~12)를 벗어나는 경우', async () => {
    const userId = 'test';
    const year = Number(new Date().getFullYear());
    const month = 18;
    const postList = await postService.getDateList(userId, year, month);
    expect(postList.length).toBe(0);
  });
});

describe('게시글 추가 TEST', () => {
  test('게시글 추가 성공', async () => {
    const post = await postService.addPost({
      userId: 'test123',
      contents: 'test contents',
    });
    expect(typeof post).toBe('object');
    expect(post.userId).toEqual('test123');
  });

  test('게시글 추가 실패 - 잘못된 아이디 형식 제공', async () => {
    await expect(
      postService.addPost({
        userId: '',
        contents: 'test contents',
      })
    ).rejects.toThrow();
  });
});

describe('게시글 삭제 TEST', () => {
  test('게시글 삭제 성공', async () => {
    const post = await postService.addPost({
      userId: 'test123',
      contents: 'test contents',
    });
    const result = await postService.deletePost('test123', post._id.toString());
    expect(result.deletedCount).toBe(1);
  });
  test('게시글 삭제 실패 - 유효하지 않은 게시글 ID', async () => {
    const failPostId = '62cb8bdea66d590b2d4d538d';
    await expect(postService.deletePost('test', failPostId)).rejects.toThrow(
      '해당 글을 찾지 못했습니다.'
    );
  });

  test('게시글 삭제 실패 - 작성자가 아닌 다른이의 삭제 요청', async () => {
    const anotherUser = 'failtest';
    await expect(postService.deletePost(anotherUser, postId)).rejects.toThrow(
      '작성자만 삭제할 수 있습니다.'
    );
  });
});

describe('게시글 수정 TEST', () => {
  test('게시글 수정 성공', async () => {
    const post = await postService.addPost({
      userId: 'test123',
      contents: 'test contents',
    });
    const updateInfo = { contents: 'new contents' };
    const updatedPost = await postService.updatePost(
      'test123',
      post._id.toString(),
      updateInfo
    );
    expect(updatedPost?.contents).toEqual('new contents');
  });

  test('게시글 수정 실패 - 유효하지 않은 게시글 ID', async () => {
    const failPostId = '62cb8bdea66d590b2d4d538d';
    const updateInfo = { contents: 'new contents' };
    await expect(
      postService.updatePost('test', failPostId, updateInfo)
    ).rejects.toThrow('해당 글을 찾지 못했습니다.');
  });

  test('게시글 수정 실패 - 작성자가 아닌 다른이의 수정 요청', async () => {
    const anotherUser = 'failtest';
    const updateInfo = { contents: 'new contents' };

    await expect(
      postService.updatePost(anotherUser, postId, updateInfo)
    ).rejects.toThrow('작성자만 수정할 수 있습니다.');
  });
});

describe('좋아요 API TEST', () => {
  test('좋아요 API 성공', async () => {
    const updatedPost = await postService.updateLike(postId);
    expect(updatedPost?.like).toBe(1);
  });

  test('좋아요 API 실패 - 유효하지 않은 게시글 ID', async () => {
    const failPostId = '62cb8bdea66d590b2d4d538d';
    await expect(postService.updateLike(failPostId)).rejects.toThrow(
      '해당 글을 찾지 못했습니다.'
    );
  });
});

describe('게시글 검색 TEST', () => {
  (async function () {
    for (let i = 1; i <= 10; i++) {
      await postService.addPost({
        userId: 'test123',
        contents: 'test contents',
        tag_list: [{ tag: '하체' }],
      });
    }
  })();

  test('검색 성공 - 검색 키워드가 없을 때 전체 반환 (무한스크롤)', async () => {
    const conditions = {
      limit: 5,
      reqNumber: 0,
    };
    const searched = await postService.searchPost('', conditions);

    expect(searched).not.toBeNull();
    expect(searched.length).toBeLessThanOrEqual(conditions.limit);
  });

  test('검색 성공 - 태그에 포함되는 검색 키워드', async () => {
    const conditions = {
      limit: 5,
      reqNumber: 0,
    };
    let searched = await postService.searchPost('하', conditions);
    expect(searched).not.toBeNull();
    expect(searched.length).toBeLessThanOrEqual(conditions.limit);

    searched = await postService.searchPost('체', conditions);
    expect(searched).not.toBeNull();
    expect(searched.length).toBeLessThanOrEqual(conditions.limit);

    searched = await postService.searchPost('하체', conditions);
    expect(searched).not.toBeNull();
    expect(searched.length).toBeLessThanOrEqual(conditions.limit);
  });

  test('검색 실패 - 잘못된 조건', async () => {
    let conditions = {
      limit: -5,
      reqNumber: 0,
    };

    await expect(postService.searchPost('', conditions)).rejects.toThrow(
      '잘못된 조건입니다.'
    );

    conditions = {
      limit: 5,
      reqNumber: -1,
    };
    await expect(postService.searchPost('', conditions)).rejects.toThrow(
      '잘못된 조건입니다.'
    );
  });
});

describe('댓글 등록 TEST', () => {
  test('등록 성공', async () => {
    const data = {
      author: 'user123',
      content: '안녕하세요!',
    };

    const result = await postService.addComment(postId, data);

    // 등록된 내용 확인
    const added: any = result!.comments.at(-1);

    commentId = added._id.toString();

    expect(added.author).toBe(data.author);
    expect(added.content).toBe(data.content);
  });

  test('등록 실패 - 유효하지 않은 게시글 ID', async () => {
    const failPostId = '62cb8bdea66d590b2d4d538d';
    const data = {
      author: 'user123',
      content: '안녕하세요!',
    };

    await expect(postService.addComment(failPostId, data)).rejects.toThrow(
      '해당 글을 찾지 못했습니다.'
    );
  });
});

describe('댓글 수정 TEST', () => {
  test('수정 성공', async () => {
    const userId = 'user123';
    const content = '좋아요';

    const result = await postService.updateComment(commentId, userId, content);

    // 수정된 내용 확인
    for (const comment of result!.comments) {
      if ((comment as any)._id === commentId) {
        expect(comment.author).toBe(userId);
        expect(comment.content).toBe(content);
      }
    }
  });

  test('수정 실패 - 유효하지 않은 댓글 ID', async () => {
    const failCommentId = '62cb8bdea66d590b2d4d538d';
    const userId = 'user123';
    const content = '멋져요';

    await expect(
      postService.updateComment(failCommentId, userId, content)
    ).rejects.toThrow('해당 댓글을 찾지 못했습니다.');
  });

  test('수정 실패 - 작성자가 아닌 다른이의 수정 요청', async () => {
    const userId = 'fail123';
    const content = '멋져요';

    await expect(
      postService.updateComment(commentId, userId, content)
    ).rejects.toThrow('작성자만 수정할 수 있습니다.');
  });
});

describe('댓글 삭제 TEST', () => {
  test('삭제 실패 - 유효하지 않은 댓글 ID', async () => {
    const failCommentId = '62cb8bdea66d590b2d4d538d';
    const userId = 'user123';

    await expect(
      postService.deleteComment(userId, failCommentId)
    ).rejects.toThrow('해당 댓글을 찾지 못했습니다.');
  });

  test('삭제 실패 - 작성자가 아닌 다른이의 삭제 요청', async () => {
    const userId = 'fail123';

    await expect(postService.deleteComment(userId, commentId)).rejects.toThrow(
      '작성자만 삭제할 수 있습니다.'
    );
  });

  test('삭제 성공', async () => {
    const userId = 'user123';
    const result = await postService.deleteComment(userId, commentId);

    // 삭제 결과 확인
    for (const comment of result!.comments) {
      expect((comment as any)._id).not.toBe(commentId);
    }
  });
});
