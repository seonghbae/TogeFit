import { mealModel, MealModel, MealArticleInfo, MealInfo } from '../db';

class MealService {
  constructor(private mealModel: MealModel) {}

  async getAllMealArticle() {
    const mealArticleListAll = this.mealModel.findAllMealArticles();
    return mealArticleListAll;
  }

  async getMealArticleList(userId: string) {
    const mealArticleList = this.mealModel.findMealArticleListByUserId(userId);
    return mealArticleList;
  }

  async addMeal(mealArticleInfo: MealArticleInfo) {
    const createdMealArticle = this.mealModel.create(mealArticleInfo);
    return createdMealArticle;
  }

  async deleteMealArticle(mealArticleId: string) {
    const mealArticle = await this.mealModel.findById(mealArticleId);

    if (!mealArticle) {
      throw new Error('해당 식단 기록을 찾을 수 없습니다.');
    }

    const result = await this.mealModel.deleteMealArticle(mealArticleId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }
}

const mealService = new MealService(mealModel);

export { mealService };
