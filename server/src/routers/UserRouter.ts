import { Router } from 'express';
import is from '@sindresorhus/is';
import { userService } from '../services';
import { loginRequired, upload } from '../middlewares';

const userRouter = Router();

// 회원 가입
userRouter.post('/register', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { name, nickname, userId, password } = req.body;

    const newUser = await userService.addUser({
      name,
      nickname,
      userId,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 회원 정보 수정
userRouter.patch(
  '/',
  loginRequired,
  upload.single('profile_image'),
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      const {
        userId,
        password,
        name,
        nickname,
        currentPassword,
        profile_image,
      } = req.body;

      if (!currentPassword) {
        throw new Error('정보 수정을 위해 비밀번호가 필요합니다.');
      }

      const requiredInfo = { userId, currentPassword };

      const toUpdateInfo = {
        ...(name && { name }),
        ...(nickname && { nickname }),
        ...(password && { password }),
        ...(profile_image && { profile_image }),
      };

      const updatedUserInfo = await userService.patchUser(
        requiredInfo,
        toUpdateInfo
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 회원 탈퇴
userRouter.delete('/', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { userId, password } = req.body;

    if (!password) {
      throw new Error('비밀번호를 입력해주십시오.');
    }

    const result = await userService.deleteUser(userId, password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post('/login', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const userId: string = req.body.id;
    const password: string = req.body.password;

    const userToken = await userService.getUserToken({ userId, password });

    res.cookie('token', userToken.token, {
      maxAge: 10000,
    });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/logout', async function (req, res, next) {
  res.cookie('token', '', { maxAge: 0 });
  res.json({ result: '로그아웃 되었습니다.' });
});

export { userRouter };
