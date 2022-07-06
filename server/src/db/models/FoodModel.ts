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
  async create(foodInfo: FoodInfo) {
    const createdNewFood = await Food.create(foodInfo);
    return createdNewFood;
  }
}

const foodModel = new FoodModel();

export { foodModel };
