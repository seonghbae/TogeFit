import { Router } from 'express';
import is from '@sindresorhus/is';
import { mealService } from '../services';

const mealRouter = Router();

// 식단 리스트 반환 (전체)
mealRouter.get('/', async (req, res, next) => {
  try {
    const mealArticleListAll = await mealService.getAllMealArticle();

    res.status(200).json(mealArticleListAll);
  } catch (error) {
    next(error);
  }
});

// 식단 리스트 반환 (유저 별)
mealRouter.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const mealArticleList = await mealService.getMealArticleList(userId);

    res.status(200).json(mealArticleList);
  } catch (error) {
    next(error);
  }
});

// 식단 글 등록
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

// 식단 글 수정
mealRouter.patch('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { mealArticleId, userId, meals } = req.body;

    if (!mealArticleId) {
      throw new Error(
        '수정을 위해서는 해당 아티클의 ID(Object ID)가 필요합니다.'
      );
    }

    const toUpdateMeal = meals;

    const updatedMealInfo = await mealService.patchMeal(
      mealArticleId,
      userId,
      toUpdateMeal
    );

    res.status(200).json(updatedMealInfo);
  } catch (error) {
    next(error);
  }
});

// 식단 글 삭제
mealRouter.delete('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { mealArticleId } = req.body;

    const result = await mealService.deleteMealArticle(mealArticleId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { mealRouter };
