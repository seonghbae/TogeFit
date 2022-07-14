import { NextFunction, Request, Response } from 'express';

function errorHandler(
  error: { status?: number; message: string; stack?: string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);
  const statusCode: Number = error.status || 400;

  res
    .status(statusCode as number)
    .json({ result: 'error', reason: error.message });
}

export { errorHandler };
