import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function loginRequired(req: Request, res: Response, next: NextFunction) {
  let userToken = null;
  const splitCookies = req.headers['cookie']?.split(';');
  splitCookies?.map((data) => {
    const splitData = data.split('=');
    if (splitData[0] == 'token') {
      userToken = splitData[1];
    }
  });

  if (!userToken || userToken == null) {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    let jwtDecoded: any = {};
    jwtDecoded = jwt.verify(userToken, secretKey);
    const userId = jwtDecoded.userId;
    req.currentUserId = userId;

    next();
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

export { loginRequired };
