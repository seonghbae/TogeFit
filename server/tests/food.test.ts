import * as db from './utils/db';
import { foodService } from '../src/services';

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());

let id: string = '';

describe('음식 등록 TEST', () => {
  test('등록 성공', async () => {
    const input = {
      name: '닭가슴살',
      carbohydrate: 10,
      protein: 50,
      fat: 20,
      quantity: 100,
      calories: 40,
    };
    const createdFood = await foodService.addFood(input);

    id = createdFood._id.toString();

    expect({
      name: createdFood.name,
      carbohydrate: createdFood.carbohydrate,
      protein: createdFood.protein,
      fat: createdFood.fat,
      quantity: createdFood.quantity,
      calories: createdFood.calories,
    }).toEqual(input);
  });

  test('등록 실패 - 이름이 비어있는 경우', async () => {
    const input = {
      name: '',
      carbohydrate: 10,
      protein: 50,
      fat: 20,
      quantity: 100,
      calories: 40,
    };

    await expect(foodService.addFood(input)).rejects.toThrow(
      '음식 이름이 반드시 필요합니다.'
    );
  });

  test('등록 실패 - 음수 데이터가 있는 경우', async () => {
    const input = {
      name: '닭가슴살',
      carbohydrate: -10,
      protein: 50,
      fat: 20,
      quantity: 100,
      calories: 40,
    };

    await expect(foodService.addFood(input)).rejects.toThrow(
      '음수의 데이터는 포함될 수 없습니다.'
    );
  });
});

describe('음식 수정 TEST', () => {
  test('수정 실패 - 잘못된 food Id', async () => {
    const input: any = {
      foodId: '62c51115cc6caa337670687c',
      name: '오이 무침',
      fat: 1,
      calories: 10,
    };

    const { foodId, ...rest } = input;
    const foodInfo = rest;

    await expect(foodService.patchFood(foodId, foodInfo)).rejects.toThrow(
      '해당 음식을 찾지 못했습니다.'
    );
  });

  test('수정 실패 - 숫자 데이터(영양소, 양)를 수정할 때 음수 데이터가 있는 경우', async () => {
    const input: any = {
      foodId: id,
      name: '오이 무침',
      fat: 1,
      calories: -10,
    };

    const { foodId, ...rest } = input;
    const foodInfo = rest;

    await expect(foodService.patchFood(foodId, foodInfo)).rejects.toThrow(
      '음수의 데이터는 포함될 수 없습니다.'
    );
  });

  test('수정 성공', async () => {
    const input: any = {
      foodId: id,
      name: '오이 무침',
      fat: 1,
      calories: 10,
    };

    const { foodId, ...rest } = input;
    const foodInfo = rest;
    const updatedFood = await foodService.patchFood(foodId, foodInfo);

    expect({
      ...(input.name && { name: updatedFood?.name }),
      ...(input.carbohydrate && { carbohydrate: updatedFood?.carbohydrate }),
      ...(input.protein && { protein: updatedFood?.protein }),
      ...(input.fat && { fat: updatedFood?.fat }),
      ...(input.quantity && { quantity: updatedFood?.quantity }),
      ...(input.calories && { calories: updatedFood?.calories }),
    }).toEqual(foodInfo);
  });
});

describe('음식 검색 TEST', () => {
  test('검색 성공 - 완벽히 일치하는 단어', async () => {
    const searched = await foodService.searchFood('오이 무침');

    expect(searched.length).not.toBe(0);
  });

  test('검색 성공 - 띄어쓰기에 걸리지 않는 검색 키워드', async () => {
    const keywords = ['오', '이', '오이', '무', '침', '무침'];
    for (const keyword of keywords) {
      const searched = await foodService.searchFood('오');

      expect(searched.length).not.toBe(0);
    }
  });

  test('검색 결과 없음 - 띄어쓰기에 걸리는 검색 키워드', async () => {
    const keywords = ['오이무', '오이무침', '이무', '이무침'];
    for (const keyword of keywords) {
      const searched = await foodService.searchFood('오이무침');

      expect(searched.length).toBe(0);
    }
  });

  test('검색 결과 없음 - 없는 검색 키워드', async () => {
    const searched = await foodService.searchFood('밥');

    expect(searched.length).toBe(0);
  });
});

describe('음식 리스트 TEST', () => {
  (async function () {
    const items = [
      {
        name: '닭가슴살1',
        carbohydrate: 10,
        protein: 50,
        fat: 20,
        quantity: 100,
        calories: 40,
      },
      {
        name: '닭가슴살2',
        carbohydrate: 10,
        protein: 50,
        fat: 20,
        quantity: 100,
        calories: 40,
      },
      {
        name: '닭가슴살3',
        carbohydrate: 10,
        protein: 50,
        fat: 20,
        quantity: 100,
        calories: 40,
      },
    ];

    for (const item of items) {
      await foodService.addFood(item);
    }
  })();

  test('음식 리스트 가져오기', async () => {
    const foodList = await foodService.getFoodList();

    expect(foodList.length).toBe(4); // 기존에 들어있던 것 까지
  });
});

describe('음식 삭제 TEST', () => {
  test('삭제 실패 - 잘못된 food Id', async () => {
    const foodId = '62c51115cc6caa337670687c';

    await expect(foodService.deleteFood(foodId)).rejects.toThrow(
      '해당 음식을 찾지 못했습니다.'
    );
  });

  test('삭제 성공', async () => {
    const foodId = id;

    expect(await foodService.deleteFood(foodId)).toEqual({ deletedCount: 1 });
  });
});
