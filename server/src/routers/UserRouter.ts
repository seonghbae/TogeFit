import { Router } from 'express';
import is from '@sindresorhus/is';
import { userService } from '../services';
import { loginRequired, upload } from '../middlewares';

const userRouter = Router();

// 유저 정보 GET
userRouter.get('/info/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    const findUser = await userService.findByUserId(userId);

    if (!findUser) {
      throw new Error('해당 유저를 찾지 못했습니다.');
    }
    const user = {
      nickname: findUser.nickname,
      profile_image: findUser.profile_image,
    };

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 회원 가입
userRouter.post('/register', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { name, nickname, userId, password } = req.body;

    if (!name) {
      throw new Error('이름 정보가 반드시 필요합니다.');
    }

    if (!nickname) {
      throw new Error('닉네임 정보가 반드시 필요합니다.');
    }

    if (!userId) {
      throw new Error('유저 아이디가 반드시 필요합니다.');
    }

    if (!password) {
      throw new Error('패스워드가 반드시 필요합니다.');
    }
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
      let isExistProfileImage = req.file ? true : false;
      let profile_image = undefined;
      if (isExistProfileImage) {
        profile_image = (req.file as Express.MulterS3.File).location;
      }
      const userId = req.currentUserId;

      const { password, name, nickname, currentPassword } = req.body;

      if (!currentPassword) {
        throw new Error('비밀번호가 반드시 필요합니다.');
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

    const userId = req.currentUserId;
    const { password } = req.body;

    if (!password) {
      throw new Error('비밀번호가 반드시 필요합니다.');
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

    if (!userId) {
      throw new Error('유저 아이디가 반드시 필요합니다.');
    }

    if (!password) {
      throw new Error('패스워드가 반드시 필요합니다.');
    }

    const userToken = await userService.getUserToken({ userId, password });

    res.cookie('token', userToken.token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.status(200).json(userToken.userId);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/logout', async function (req, res, next) {
  res.cookie('token', '', { maxAge: 0 });
  res.json({ result: '로그아웃 되었습니다.' });
});

export { userRouter };
