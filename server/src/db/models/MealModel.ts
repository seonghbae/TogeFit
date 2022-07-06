import { model } from 'mongoose';
import { MealArticleSchema } from '../schemas/MealSchema';

const Meal = model('meals', MealArticleSchema);

export interface MealInfo {
  foodName: string;
  quantity: number;
}

export interface MealArticleInfo {
  userId: string;
  meals: MealInfo[][];
}

export class MealModel {
  async findAll() {
    const mealArticleList = await Meal.find({});
    return mealArticleList;
  }

  async findById(id: string) {
    const mealArticle = await Meal.findOne({ _id: id });
    return mealArticle;
  }

  async create(mealArticleInfo: MealArticleInfo) {
    const createdNewMeal = await Meal.create(mealArticleInfo);
    return createdNewMeal;
  }

  async update(mealArticleId: string, toUpdateMeal: MealInfo[][]) {
    // 구현 예정
  }

  async deleteMealArticle(mealArticleId: string) {
    const { deletedCount } = await Meal.deleteOne({ _id: mealArticleId });
    return { deletedCount };
  }
}

const mealModel = new MealModel();

export { mealModel };
