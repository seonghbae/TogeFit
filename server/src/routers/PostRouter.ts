import { Router } from 'express';
import is from '@sindresorhus/is';
import { postService } from '../services';
import { upload } from '../middlewares/';
import { getTagList, getPostImageList } from '../utils';

const postRouter = Router();

// 게시글 등록
postRouter.post(
  '/register',
  upload.array('post_image'),
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요.'
        );
      }

      const { userId, contents, tag_list, is_open, meal, routine } = req.body;
      // 'a,b,c'로 태그를 받아와 배열로 만들어줌
      const newTagList = getTagList(tag_list);

      // req.files의 location을 받아옴
      const postImages = getPostImageList(
        req.files as {
          [fieldname: string]: Express.Multer.File[];
        }
      );

      const data = {
        userId,
        contents,
        tag_list: newTagList,
        post_image: postImages,
        is_open,
        meal,
        routine,
      };
      const newPost = await postService.addPost(data);

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// 게시글 삭제
postRouter.delete('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { postId } = req.body;

    const result = await postService.deletePost(postId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정
postRouter.patch('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }
    const { postId, contents, meal, routine } = req.body;

    const toUpdateInfo = {
      ...(contents && { contents }),
      ...(meal && { meal }),
      ...(routine && { routine }),
    };

    console.log(postId, toUpdateInfo);
    const updatedPost = await postService.updatePost(postId, toUpdateInfo);
    res.status(201).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

export { postRouter };
