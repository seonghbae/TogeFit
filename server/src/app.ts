import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { dbconnect } from './db/index';
import { userRouter, foodRouter, exerciseListRouter } from './routers';
import cookieParser from 'cookie-parser';

const app = express();
dbconnect();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/exerciseList', exerciseListRouter);
app.use('/api/food', foodRouter);

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

export { app };
