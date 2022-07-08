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

  async findArticleByMealListId(mealListId: string) {
    const mealList = await Meal.findOne({
      'meals._id': mealListId,
    });
    return mealList;
  }

  async checkEmpty(mealArticleId: string) {
    const mealArticle = await Meal.findOne({ _id: mealArticleId });
    return mealArticle?.meals.length === 0;
  }

  async create(mealArticleInfo: MealArticleInfo) {
    const createdNewMeal = await Meal.create(mealArticleInfo);
    return createdNewMeal;
  }

  async pushOneMeal(mealArticleId: string, meals: MealArrayInfo) {
    console.log(meals);
    const { modifiedCount } = await Meal.updateOne(
      { _id: mealArticleId },
      {
        $push: { meals },
      }
    );

    return { modifiedCount };
  }

  async update(
    mealArticleId: string,
    userId: string,
    toUpdateMeal: MealArrayInfo[]
  ) {
    // 하...........
    // toUpdateMeal.map((meal) => {
    //   console.log(meal);
    // });
    // const toUpdateInfo = {
    //   userId,
    //   meals: toUpdateMeal,
    // };
    // const result = await Meal.updateOne(
    //   { _id: mealArticleId },
    //   {
    //     $set: toUpdateInfo,
    //   }
    // );
    // const { modifiedCount } = result;
    // return modifiedCount;
  }

  async deleteMealArticle(mealArticleId: string) {
    const { deletedCount } = await Meal.deleteOne({ _id: mealArticleId });
    return { deletedCount };
  }

  async deleteOneMealById(mealListId: string) {
    const { modifiedCount } = await Meal.updateOne(
      { 'meals._id': mealListId },
      {
        $pull: {
          meals: { _id: mealListId },
        },
      }
    );

    return { modifiedCount };
  }
}

const mealModel = new MealModel();

export { mealModel };
