import {
  mealModel,
  MealModel,
  MealArticleInfo,
  MealInfo,
  MealArrayInfo,
  ConditionInfo,
} from '../db';

interface ErrorWithStatus {
  status?: number;
  message: string;
  stack?: string;
}

class MealService {
  constructor(private mealModel: MealModel) {}

  async getAllMealArticle() {
    const mealArticleListAll = await this.mealModel.findAll();
    return mealArticleListAll;
  }

  async getMealArticleListByUserId(userId: string, conditions: ConditionInfo) {
    const mealArticleList = await this.mealModel.findArticlesByUserId(
      userId,
      conditions
    );
    return mealArticleList;
  }

  async getMealArticleById(mealArticleId: string) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾지 못했습니다.');
    }

    return mealArticle;
  }

  async addMealArticle(userId: string, meals: MealInfo[][]) {
    const mealArray = meals.map((meal: MealInfo[]) => {
      for (const obj of meal) {
        if (obj.foodName.length === 0) {
          throw new Error('음식 이름이 반드시 필요합니다.');
        }
        if (obj.quantity < 0) {
          throw new Error('음식의 양은 반드시 양수여야 합니다.');
        }
      }

      return {
        meal_list: meal,
      };
    });

    const toAddInfo = {
      userId,
      meals: mealArray,
    };

    const createdMealArticle = await this.mealModel.create(toAddInfo);
    return createdMealArticle;
  }

  async deleteMealArticle(userId: string, mealArticleId: string) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾지 못했습니다.');
    }

    if (mealArticle.userId !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 삭제할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    const result = await this.mealModel.deleteMealArticle(mealArticleId);

    return result;
  }

  async addOneMeal(
    userId: string,
    mealArticleId: string,
    meals: MealArrayInfo
  ) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾지 못했습니다.');
    }

    if (mealArticle.userId !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 수정할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    for (const obj of meals.meal_list) {
      if (obj.foodName.length === 0) {
        throw new Error('음식 이름이 반드시 필요합니다.');
      }
      if (obj.quantity < 0) {
        throw new Error('음식의 양은 반드시 양수여야 합니다.');
      }
    }

    const result = await this.mealModel.pushOneMeal(mealArticleId, meals);

    return result;
  }

  async patchOneMeal(userId: string, mealListId: string, meals: MealInfo[]) {
    const mealArticle = await this.mealModel.findArticleByMealListId(
      mealListId
    );

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾지 못했습니다.');
    }

    if (mealArticle.userId !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 수정할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    for (const obj of meals) {
      if (obj.foodName.length === 0) {
        throw new Error('음식 이름이 반드시 필요합니다.');
      }
      if (obj.quantity < 0) {
        throw new Error('음식의 양은 반드시 양수여야 합니다.');
      }
    }

    const result = await this.mealModel.updateOneMeal(mealListId, meals);

    return result;
  }

  async deleteOneMeal(userId: string, mealListId: string) {
    const mealArticle = await this.mealModel.findArticleByMealListId(
      mealListId
    );

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾지 못했습니다.');
    }
    const mealArticleId = mealArticle._id.toString();

    if (mealArticle.userId !== userId) {
      const error: ErrorWithStatus = new Error('작성자만 수정할 수 있습니다.');
      error.status = 403;
      throw error;
    }

    const result = await this.mealModel.deleteOneMealById(mealListId);

    // 남아있는 식사 정보가 없으면 데이터 삭제
    if (result!.meals.length === 0) {
      // meals가 비었음 -> 데이터 삭제
      await this.mealModel.deleteMealArticle(mealArticleId);
    }

    return result;
  }
}

const mealService = new MealService(mealModel);

export { mealService, MealInfo };
