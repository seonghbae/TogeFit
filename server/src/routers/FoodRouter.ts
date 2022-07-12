import { Router } from 'express';
import is from '@sindresorhus/is';
import { foodService } from '../services';

const foodRouter = Router();

// 음식 리스트 반환
foodRouter.get('/', async (req, res, next) => {
  try {
    const foodList = await foodService.getFoodList();

    res.status(200).json(foodList);
  } catch (error) {
    next(error);
  }
});

// 음식 검색
foodRouter.get('/search', async (req, res, next) => {
  try {
    const keyword = req.query.foodName as string;
    const searchedFoodList = await foodService.searchFood(keyword);

    res.status(200).json(searchedFoodList);
  } catch (error) {
    next(error);
  }
});

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

// 음식 수정
foodRouter.patch('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { foodId, name, carbohydrate, protein, fat, quantity, calories } =
      req.body;

    if (!foodId) {
      throw new Error(
        '수정을 위해서는 해당 음식의 ID(Object ID)가 필요합니다.'
      );
    }

    const toUpdateInfo = {
      ...(name && { name }),
      ...(carbohydrate && { carbohydrate }),
      ...(protein && { protein }),
      ...(fat && { fat }),
      ...(quantity && { quantity }),
      ...(calories && { calories }),
    };

    const updatedFoodInfo = await foodService.patchFood(foodId, toUpdateInfo);

    res.status(200).json(updatedFoodInfo);
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
