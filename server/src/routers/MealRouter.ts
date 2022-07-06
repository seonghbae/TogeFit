import { Router } from 'express';
import is from '@sindresorhus/is';
import { mealService } from '../services';

const mealRouter = Router();

mealRouter.post('/register', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const newMealArticle = await mealService.addMeal(req.body);

    res.status(201).json(newMealArticle);
  } catch (error) {
    next(error);
  }
});

export { mealRouter };
