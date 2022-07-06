import { model } from 'mongoose';
import { MealArticleSchema } from '../schemas/MealSchema';

const Meal = model('meals', MealArticleSchema);

export interface MealInfo {
  foodName: string;
  quantity: number;
}

export interface MealArticleInfo {
  userId: string;
  meals: MealInfo[];
}

export class MealModel {
  async findById(mealArticleId: string) {
    const mealArticle = await Meal.findOne({ _id: mealArticleId });
    return mealArticle;
  }

  async create(mealArticleInfo: MealArticleInfo) {
    const createdNewMeal = await Meal.create(mealArticleInfo);
    return createdNewMeal;
  }

  async deleteMealArticle(mealArticleId: string) {
    const { deletedCount } = await Meal.deleteOne({ _id: mealArticleId });
    return { deletedCount };
  }
}

const mealModel = new MealModel();

export { mealModel };
