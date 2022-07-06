import { mealModel, MealModel, MealArticleInfo, MealInfo } from '../db';

class MealService {
  constructor(private mealModel: MealModel) {}

  async addMeal(mealArticleInfo: MealArticleInfo) {
    const createdMealArticle = this.mealModel.create(mealArticleInfo);
    return createdMealArticle;
  }
}

const mealService = new MealService(mealModel);

export { mealService };
