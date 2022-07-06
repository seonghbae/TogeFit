import { model } from 'mongoose';
import { FoodSchema } from '../schemas/FoodSchema';

const Food = model('foods', FoodSchema);

export interface FoodInfo {
  name: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  quantity: number;
  calories: number;
}

export class FoodModel {
  async findById(foodId: string) {
    const food = await Food.findOne({ _id: foodId });
    return food;
  }

  async create(foodInfo: FoodInfo) {
    const createdNewFood = await Food.create(foodInfo);
    return createdNewFood;
  }

  async update(foodId: string, toUpdateInfo: Partial<FoodInfo>) {
    const filter = { _id: foodId };
    const options = { returnOriginal: false };
    const updatedFood = await Food.findOneAndUpdate(
      filter,
      toUpdateInfo,
      options
    );

    return updatedFood;
  }

  async deleteFood(foodId: string) {
    const { deletedCount } = await Food.deleteOne({ _id: foodId });
    return { deletedCount };
  }
}

const foodModel = new FoodModel();

export { foodModel };
