import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { dbconnect } from './db/index';
import { userRouter, foodRouter } from './routers';

const app = express();
dbconnect();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

export { app };
