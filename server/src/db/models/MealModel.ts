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
  async create(mealArticleInfo: MealArticleInfo) {
    const createdNewMeal = await Meal.create(mealArticleInfo);
    return createdNewMeal;
  }
}

const mealModel = new MealModel();

export { mealModel };
