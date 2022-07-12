import { foodModel, FoodModel, FoodInfo } from '../db';

class FoodService {
  constructor(private foodModel: FoodModel) {}

  async getFoodList() {
    const foodList = await this.foodModel.findAllFood();
    return foodList;
  }

  async findById(foodId: string) {
    const food = await this.foodModel.findById(foodId);
    return food;
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
      throw new Error('해당 음식을 찾을 수 없습니다.');
    }

    const updatedFood = await this.foodModel.update(foodId, toUpdateInfo);

    return updatedFood;
  }

  async deleteFood(foodId: string) {
    const food = await this.foodModel.findById(foodId);

    if (!food) {
      throw new Error('해당 음식을 찾을 수 없습니다.');
    }

    const result = await this.foodModel.deleteFood(foodId);

    if (!result) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해주세요.');
    }

    return result;
  }
}

const foodService = new FoodService(foodModel);

export { foodService };
