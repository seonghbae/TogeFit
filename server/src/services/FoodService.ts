import { foodModel, FoodModel, FoodInfo } from '../db';

class FoodService {
  constructor(private foodModel: FoodModel) {}

  async getFoodList() {
    const foodList = await this.foodModel.findAllFood();
    return foodList;
  }

  async searchFood(keyword: string) {
    const food = await this.foodModel.searchFood(keyword);
    return food;
  }

  async addFood(foodInfo: FoodInfo) {
    const createdNewFood = await this.foodModel.create(foodInfo);
    return createdNewFood;
  }

  async patchFood(foodId: string, toUpdateInfo: Partial<FoodInfo>) {
    const food = await this.foodModel.findById(foodId);

    if (!food) {
      throw new Error('해당 음식을 찾지 못했습니다.');
    }

    const updatedFood = await this.foodModel.update(foodId, toUpdateInfo);

    return updatedFood;
  }

  async deleteFood(foodId: string) {
    const food = await this.foodModel.findById(foodId);

    if (!food) {
      throw new Error('해당 음식을 찾지 못했습니다.');
    }

    const result = await this.foodModel.deleteFood(foodId);

    return result;
  }
}

const foodService = new FoodService(foodModel);

export { foodService };
