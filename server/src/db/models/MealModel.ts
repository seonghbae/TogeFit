import { model } from 'mongoose';
import { MealArticleSchema } from '../schemas/MealSchema';
import { ConditionInfo, DateInfo } from './PostModel';
import { getCurrentAndNextMonth } from '../../utils';
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

  async findArticlesByUserId(
    userId: string,
    date: DateInfo,
    conditions: ConditionInfo
  ) {
    const { current, next } = getCurrentAndNextMonth(date.year, date.month);

    const filter = {
      $and: [
        { userId: userId },
        {
          createdAt: {
            $gte: new Date(`${current.year}-${current.month}-01`).toISOString(),
            $lt: new Date(`${next.year}-${next.month}-01`).toISOString(),
          },
        },
      ],
    };

    const mealArticle = await Meal.find(filter)
      .skip(conditions.reqNumber * conditions.limit)
      .sort({ _id: -1 })
      .limit(conditions.limit);

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
