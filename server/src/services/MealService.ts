import {
  mealModel,
  MealModel,
  MealArticleInfo,
  MealInfo,
  MealArrayInfo,
} from '../db';

class MealService {
  constructor(private mealModel: MealModel) {}

  async getAllMealArticle() {
    const mealArticleListAll = await this.mealModel.findAll();
    return mealArticleListAll;
  }

  async getMealArticleList(userId: string) {
    const mealArticleList = await this.mealModel.findById(userId);
    return mealArticleList;
  }

  async getMealArticleById(mealArticleId: string) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾을 수 없습니다.');
    }

    return mealArticle;
  }

  async addMeal(mealArticleInfo: MealArticleInfo) {
    const createdMealArticle = await this.mealModel.create(mealArticleInfo);
    return createdMealArticle;
  }

  async patchMeal(
    mealArticleId: string,
    userId: string,
    toUpdateMeal: MealArrayInfo[]
  ) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾을 수 없습니다.');
    }

    if (mealArticle.userId !== userId) {
      throw new Error('작성자만 수정할 수 있습니다.');
    }

    const result = await this.mealModel.update(
      mealArticleId,
      userId,
      toUpdateMeal
    );

    // if (!result) {
    //   throw new Error('수정에 실패했습니다. 다시 한 번 확인해주세요.');
    // }

    return result;
  }

  async deleteMealArticle(userId: string, mealArticleId: string) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾을 수 없습니다.');
    }

    if (mealArticle.userId !== userId) {
      throw new Error('작성자만 삭제할 수 있습니다.');
    }

    const result = await this.mealModel.deleteMealArticle(mealArticleId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }

  async addOneMeal(
    userId: string,
    mealArticleId: string,
    meals: MealArrayInfo
  ) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾을 수 없습니다.');
    }

    if (mealArticle.userId !== userId) {
      throw new Error('작성자만 수정할 수 있습니다.');
    }

    const result = await this.mealModel.pushOneMeal(mealArticleId, meals);

    if (!result) {
      throw new Error('수정에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }

  async deleteOneMeal(userId: string, mealListId: string) {
    const mealArticle = await this.mealModel.findArticleByMealListId(
      mealListId
    );

    if (!mealArticle) {
      throw new Error('해당 식사를 찾을 수 없습니다.');
    }
    const mealArticleId = mealArticle._id.toString();

    if (mealArticle.userId !== userId) {
      throw new Error('작성자만 수정할 수 있습니다.');
    }

    const result = await this.mealModel.deleteOneMealById(mealListId);

    if (!result) {
      throw new Error('수정에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    // 남아있는 식사 정보가 없으면 데이터 삭제
    const isEmpty = await this.mealModel.checkEmpty(mealArticleId);

    if (isEmpty) {
      // meals가 비었음 -> 데이터 삭제
      await this.mealModel.deleteMealArticle(mealArticleId);
    }

    return result;
  }
}

const mealService = new MealService(mealModel);

export { mealService, MealInfo };
