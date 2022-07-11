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

  async findByUserId(userId: string) {
    const mealArticle = await Meal.findOne({ userId });
    return mealArticle;
  }

  async findArticleByMealListId(mealListId: string) {
    const mealList = await Meal.findOne({
      'meals._id': mealListId,
    });
    return mealList;
  }

  async create(mealArticleInfo: MealArticleInfo) {
    const createdNewMeal = await Meal.create(mealArticleInfo);
    return createdNewMeal;
  }

  async pushOneMeal(mealArticleId: string, meals: MealArrayInfo) {
    const updatedInfo = await Meal.findOneAndUpdate(
      { _id: mealArticleId },
      {
        $push: { meals },
      },
      { returnOriginal: false }
    );

    return updatedInfo;
  }

  async updateOneMeal(mealListId: string, toUpdateMeal: MealInfo[]) {
    const updatedInfo = await Meal.findOneAndUpdate(
      { 'meals._id': mealListId },
      {
        $set: {
          'meals.$.meal_list': toUpdateMeal,
        },
      },
      { returnOriginal: false }
    );

    return updatedInfo;
  }

  async deleteMealArticle(mealArticleId: string) {
    const { deletedCount } = await Meal.deleteOne({ _id: mealArticleId });
    return { deletedCount };
  }

  async deleteOneMealById(mealListId: string) {
    const updatedInfo = await Meal.findOneAndUpdate(
      { 'meals._id': mealListId },
      {
        $pull: {
          meals: { _id: mealListId },
        },
      },
      { returnOriginal: false }
    );

    return updatedInfo;
  }
}

const mealModel = new MealModel();

export { mealModel };
