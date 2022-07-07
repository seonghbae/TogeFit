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

    if (!result) {
      throw new Error('수정에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }

  async deleteMealArticle(mealArticleId: string) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 아티클을 찾을 수 없습니다.');
    }

    const result = await this.mealModel.deleteMealArticle(mealArticleId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }
}

const mealService = new MealService(mealModel);

export { mealService, MealInfo };
