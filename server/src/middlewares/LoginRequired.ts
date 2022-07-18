import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import jwt from 'jsonwebtoken';

async function loginRequired(req: Request, res: Response, next: NextFunction) {
  let userToken: string = '';
  const splitCookies = req.headers['cookie']?.split(';');
  splitCookies?.map((data) => {
    const splitData = data.split('=');
    if (splitData[0].trim() == 'token') {
      userToken = splitData[1];
    }
  });

  if (!userToken || userToken == null) {
    console.log('token is null');
    res.status(401).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

  jwt.verify(userToken, secretKey, async function (err, decoded) {
    const error = Object(err);
    if (!err) {
      //access token이 문제 없을 경우
      let accessTokenDecoded: any = jwt.verify(userToken, secretKey, {
        ignoreExpiration: true,
      });
      const userId = accessTokenDecoded.userId;
      const user = await userService.findByUserId(userId);
      const userRefreshToken = user?.refresh_token as string;

      // access token은 문제 없으나, refresh token이 만료되었을 경우 검사
      jwt.verify(userRefreshToken, secretKey, async function (err, decoded) {
        if (Object(err).message == 'jwt expired') {
          console.log('refresh token is expired');
          const refreshToken = jwt.sign({}, secretKey, {
            expiresIn: '7d',
          });

          await userService.setRefreshToken(userId, refreshToken);
          console.log('refresh token 발급 완료');
        }
      });

      req.currentUserId = userId;
      next();
    } else if (error.message == 'jwt expired') {
      //access token이 만료된 경우
      let accessTokenDecoded: any = jwt.verify(userToken, secretKey, {
        ignoreExpiration: true,
      });
      const userId = accessTokenDecoded.userId;

      const user = await userService.findByUserId(userId);
      const userRefreshToken = user?.refresh_token as string;

      // 유저의 refresh token이 유효하다면 access token을 재발급 해주고,
      // refresh token이 만료되었다면 현재 브라우저에서 로그아웃
      jwt.verify(userRefreshToken, secretKey, function (err, decoded) {
        if (Object(err).message == 'jwt expired') {
          console.log('refresh token is expired');
          res.cookie('token', '', { maxAge: 0 });
          res.status(401).json({
            result: 'forbidden-approach',
            reason: '만료된 토큰입니다.',
          });
          return;
        } else {
          const accessToken = jwt.sign({ userId }, secretKey, {
            expiresIn: '5m',
          });
          res.cookie('token', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          });
          console.log('access token 발급완료');
          req.currentUserId = userId;
          next();
        }
      });
    } else {
      res.cookie('token', '', { maxAge: 0 });
      res.status(401).json({
        result: 'forbidden-approach',
        reason: '정상적인 토큰이 아닙니다.',
      });
      return;
    }
  });
}

export { loginRequired };
