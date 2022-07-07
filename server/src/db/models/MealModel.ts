import { model } from 'mongoose';
import { MealArticleSchema } from '../schemas/MealSchema';

const Meal = model('meals', MealArticleSchema);

export interface MealInfo {
  foodName: string;
  quantity: number;
}

export interface MealArrayInfo {
  meal_list: MealInfo[];
}

export interface MealArticleInfo {
  userId: string;
  meals: MealArrayInfo[];
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

  async update(
    mealArticleId: string,
    userId: string,
    toUpdateMeal: MealArrayInfo[]
  ) {
    const toUpdateInfo = {
      userId,
      meals: toUpdateMeal,
    };

    const result = await Meal.updateOne(
      { _id: mealArticleId },
      {
        $set: toUpdateInfo,
      }
    );

    const { modifiedCount } = result;

    return modifiedCount;
  }

  async deleteMealArticle(mealArticleId: string) {
    const { deletedCount } = await Meal.deleteOne({ _id: mealArticleId });
    return { deletedCount };
  }
}

const mealModel = new MealModel();

export { mealModel };
