import express from 'express';
import cors from 'cors';
import { dbconnect } from './db/Connect';
import {
  userRouter,
  foodRouter,
  mealRouter,
  exerciseListRouter,
  routineRouter,
  postRouter,
} from './routers';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares';

const app = express();
dbconnect();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/exerciseList', exerciseListRouter);
app.use('/api/food', foodRouter);
app.use('/api/meal', mealRouter);
app.use('/api/routine', routineRouter);
app.use('/api/post', postRouter);

app.use(errorHandler);

export { app };
