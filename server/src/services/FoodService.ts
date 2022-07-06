import { foodModel, FoodModel, FoodInfo } from '../db';

class FoodService {
  constructor(private foodModel: FoodModel) {}

  async addFood(foodInfo: FoodInfo) {
    const createdNewFood = this.foodModel.create(foodInfo);
    return createdNewFood;
  }
}

const foodService = new FoodService(foodModel);

export { foodService };
