import { Router } from 'express';
import is from '@sindresorhus/is';
import { foodService } from '../services';

const foodRouter = Router();

foodRouter.post('/register', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const newFood = await foodService.addFood(req.body);

    res.status(201).json(newFood);
  } catch (error) {
    next(error);
  }
});

export { foodRouter };
