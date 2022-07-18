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
    if (foodInfo.name.length === 0) {
      throw new Error('음식 이름이 반드시 필요합니다.');
    }

    if (
      foodInfo.carbohydrate < 0 ||
      foodInfo.fat < 0 ||
      foodInfo.protein < 0 ||
      foodInfo.calories < 0 ||
      foodInfo.quantity < 0
    ) {
      throw new Error('음수의 데이터는 포함될 수 없습니다.');
    }

    const createdNewFood = await this.foodModel.create(foodInfo);
    return createdNewFood;
  }

  async patchFood(foodId: string, toUpdateInfo: Partial<FoodInfo>) {
    if (
      (toUpdateInfo.carbohydrate && toUpdateInfo.carbohydrate < 0) ||
      (toUpdateInfo.fat && toUpdateInfo.fat < 0) ||
      (toUpdateInfo.protein && toUpdateInfo.protein < 0) ||
      (toUpdateInfo.calories && toUpdateInfo.calories < 0) ||
      (toUpdateInfo.quantity && toUpdateInfo.quantity < 0)
    ) {
      throw new Error('음수의 데이터는 포함될 수 없습니다.');
    }

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
