import { Router } from 'express';
import is from '@sindresorhus/is';
import { mealService, MealInfo, userService } from '../services';
import { loginRequired } from '../middlewares';

const mealRouter = Router();

// 식단 리스트 반환 (전체)
mealRouter.get('/all', async (req, res, next) => {
  try {
    const mealArticleListAll = await mealService.getAllMealArticle();

    res.status(200).json(mealArticleListAll);
  } catch (error) {
    next(error);
  }
});

// 식단 리스트 반환 (유저 별 + 무한스크롤)
mealRouter.get('/user', async (req, res, next) => {
  try {
    const { userId, limit, reqNumber } = req.query;

    if (!userId) {
      throw new Error('유저 아이디가 반드시 필요합니다.');
    }

    if (!limit) {
      throw new Error('limit 정보가 반드시 필요합니다.');
    }

    if (!reqNumber) {
      throw new Error('reqNumber 정보가 반드시 필요합니다.');
    }

    const conditions = {
      limit: parseInt(limit as string),
      reqNumber: parseInt(reqNumber as string),
    };

    const isUserExist = await userService.findByUserId(userId as string);

    if (!isUserExist) {
      throw new Error('해당 유저를 찾지 못했습니다.');
    }

    const mealArticleList = await mealService.getMealArticleListByUserId(
      userId as string,
      conditions
    );

    res.status(200).json(mealArticleList);
  } catch (error) {
    next(error);
  }
});

// 식단 글 반환 (식단 글 object ID 이용)
mealRouter.get('/article/:mealArticleId', async (req, res, next) => {
  try {
    const { mealArticleId } = req.params;

    if (!mealArticleId) {
      throw new Error('식단 글의 ID(object ID)가 반드시 필요합니다.');
    }

    const mealArticle = await mealService.getMealArticleById(mealArticleId);

    res.status(200).json(mealArticle);
  } catch (error) {
    next(error);
  }
});

// 식단 글 등록
mealRouter.post('/register', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { meals } = req.body;

    const userId = req.currentUserId;

    if (!meals) {
      throw new Error('식단 정보가 반드시 필요합니다.');
    }

    const mealArray = meals.map((meal: MealInfo[]) => {
      return {
        meal_list: meal,
      };
    });

    const toAddInfo = {
      userId,
      meals: mealArray,
    };

    const newMealArticle = await mealService.addMealArticle(toAddInfo);

    res.status(201).json(newMealArticle);
  } catch (error) {
    next(error);
  }
});

// 식단 글 삭제
mealRouter.delete('/', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { mealArticleId } = req.body;

    if (!mealArticleId) {
      throw new Error('식단 글의 ID(Object ID)가 반드시 필요합니다.');
    }

    const userId = req.currentUserId;

    const result = await mealService.deleteMealArticle(userId, mealArticleId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 식사 추가
mealRouter.post('/one', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { mealArticleId, meals } = req.body;

    if (!mealArticleId) {
      throw new Error('식단 글의 ID(Object ID)가 반드시 필요합니다.');
    }

    if (!meals) {
      throw new Error('식단 정보가 반드시 필요합니다.');
    }

    const mealArray = {
      meal_list: meals,
    };

    const userId = req.currentUserId;

    const result = await mealService.addOneMeal(
      userId,
      mealArticleId,
      mealArray
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 식사 수정
mealRouter.patch('/one', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { mealListId, meals } = req.body;

    if (!mealListId) {
      throw new Error('식단 글의 ID(Object ID)가 반드시 필요합니다.');
    }

    if (!meals) {
      throw new Error('식단 정보가 반드시 필요합니다.');
    }

    const userId = req.currentUserId;

    const result = await mealService.patchOneMeal(userId, mealListId, meals);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 식사 삭제
mealRouter.delete('/one', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { mealListId } = req.body;

    if (!mealListId) {
      throw new Error('식단 글의 ID(Object ID)가 반드시 필요합니다.');
    }

    const userId = req.currentUserId;

    const result = await mealService.deleteOneMeal(userId, mealListId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { mealRouter };
