import { Router } from 'express';
import is from '@sindresorhus/is';
import { postService } from '../services';
import { loginRequired, upload } from '../middlewares/';
import { getTagList, getPostImageList } from '../utils';

const postRouter = Router();

// 게시글 등록
postRouter.post(
  '/register',
  loginRequired,
  upload.array('post_image'),
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요.'
        );
      }

      const userId = req.currentUserId;
      const { contents, tag_list, is_open, meal, routine } = req.body;
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
postRouter.delete('/', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const userId = req.currentUserId;
    const { postId } = req.body;

    const result = await postService.deletePost(userId, postId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정
postRouter.patch(
  '/:postId',
  loginRequired,
  upload.array('post_image'),
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요.'
        );
      }

      const userId = req.currentUserId;
      const postId = req.params.postId;
      let postImages = undefined;
      let imageArrayLength = 0;
      if (req.files) {
        postImages = getPostImageList(
          req.files as {
            [fieldname: string]: Express.Multer.File[];
          }
        );
        imageArrayLength = postImages.length;
      }

      const { contents, is_open, tag_list, meal, routine } = req.body;

      let newTagList = tag_list;
      if (tag_list) {
        newTagList = getTagList(tag_list);
      }

      const toUpdateInfo = {
        ...(contents && { contents }),
        ...(imageArrayLength > 0 && { post_image: postImages }),
        ...(is_open && { is_open }),
        ...(newTagList && { tag_list: newTagList }),
        ...(meal && { meal }),
        ...(routine && { routine }),
      };

      const updatedPost = await postService.updatePost(
        userId,
        postId,
        toUpdateInfo
      );
      res.status(201).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

export { postRouter };
