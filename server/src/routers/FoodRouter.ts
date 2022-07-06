import { Router } from 'express';
import is from '@sindresorhus/is';
import { foodService } from '../services';

const foodRouter = Router();

// 음식 등록
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

// 음식 삭제
foodRouter.delete('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { foodId } = req.body;

    const result = await foodService.deleteFood(foodId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { foodRouter };
