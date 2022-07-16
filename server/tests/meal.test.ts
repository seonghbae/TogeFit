import * as db from './utils/db';
import { mealService } from '../src/services';
import { MealInfo } from '../src/db/models/MealModel';

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());

let id: string = '';
let m_id: string = '';

describe('식단 글 등록 TEST', () => {
  test('등록 성공', async () => {
    const userId = 'test123';
    const meals = [
      [
        {
          foodName: '짜장면',
          quantity: 300,
        },
        {
          foodName: '코카콜라',
          quantity: 500,
        },
      ],
      [
        {
          foodName: '치킨',
          quantity: 300,
        },
      ],
    ];

    const newMealArticle = await mealService.addMealArticle(userId, meals);

    id = newMealArticle._id.toString();

    expect(newMealArticle.userId).toBe(userId);
    expect(newMealArticle.meals.length).toBe(meals.length);

    // 등록된 내용이 같은지 비교
    const compArticle = [];
    const compMeals = [];

    for (const mealArray of newMealArticle.meals) {
      compArticle.push(...mealArray.meal_list);
    }

    for (const meal of meals) {
      compMeals.push(...meal);
    }

    for (let i = 0; i < compArticle.length; i++) {
      expect(compArticle[i].foodName).toBe(compMeals[i].foodName);
      expect(compArticle[i].quantity).toBe(compMeals[i].quantity);
    }
  });

  test('등록 실패 - 음식 이름이 비어있는 경우', async () => {
    const userId = 'test123';
    const meals = [
      [
        {
          foodName: '',
          quantity: 300,
        },
        {
          foodName: '코카콜라',
          quantity: 500,
        },
      ],
      [
        {
          foodName: '치킨',
          quantity: 300,
        },
      ],
    ];

    await expect(mealService.addMealArticle(userId, meals)).rejects.toThrow(
      '음식 이름이 반드시 필요합니다.'
    );
  });

  test('등록 실패 - 음식 양이 음수인 경우', async () => {
    const userId = 'test123';
    const meals = [
      [
        {
          foodName: '짜장면',
          quantity: -100,
        },
        {
          foodName: '코카콜라',
          quantity: 500,
        },
      ],
      [
        {
          foodName: '치킨',
          quantity: 300,
        },
      ],
    ];

    await expect(mealService.addMealArticle(userId, meals)).rejects.toThrow(
      '음식의 양은 반드시 양수여야 합니다.'
    );
  });
});

describe('식사 추가 TEST', () => {
  test('추가 성공', async () => {
    const userId = 'test123';
    const mealArticleId = id;
    const meals = [
      {
        foodName: '그래놀라',
        quantity: 200,
      },
      {
        foodName: '우유',
        quantity: 100,
      },
    ];

    const mealArray = {
      meal_list: meals,
    };

    const result = await mealService.addOneMeal(
      userId,
      mealArticleId,
      mealArray
    );

    // 추가된 내용 확인
    const added: any = result?.meals.at(-1);
    m_id = added._id.toString();

    for (let i = 0; i < added!.meal_list.length; i++) {
      expect(added!.meal_list[i].foodName).toBe(meals[i].foodName);
      expect(added!.meal_list[i].quantity).toBe(meals[i].quantity);
    }
  });

  test('추가 실패 - 음식 이름이 비어있는 경우', async () => {
    const userId = 'test123';
    const mealArticleId = id;
    const meals = [
      {
        foodName: '',
        quantity: 200,
      },
      {
        foodName: '우유',
        quantity: 100,
      },
    ];

    const mealArray = {
      meal_list: meals,
    };

    await expect(
      mealService.addOneMeal(userId, mealArticleId, mealArray)
    ).rejects.toThrow('음식 이름이 반드시 필요합니다.');
  });

  test('추가 실패 - 음식 양이 음수인 경우', async () => {
    const userId = 'test123';
    const mealArticleId = id;
    const meals = [
      {
        foodName: '그래놀라',
        quantity: -200,
      },
      {
        foodName: '우유',
        quantity: 100,
      },
    ];

    const mealArray = {
      meal_list: meals,
    };

    await expect(
      mealService.addOneMeal(userId, mealArticleId, mealArray)
    ).rejects.toThrow('음식의 양은 반드시 양수여야 합니다.');
  });

  test('추가 실패 - 잘못된 식단 글 Id', async () => {
    const userId = 'test123';
    const mealArticleId = '62c7da69cf3f4d7ac490e2dc';
    const meals = [
      {
        foodName: '그래놀라',
        quantity: 200,
      },
      {
        foodName: '우유',
        quantity: 100,
      },
    ];

    const mealArray = {
      meal_list: meals,
    };

    await expect(
      mealService.addOneMeal(userId, mealArticleId, mealArray)
    ).rejects.toThrow('해당 아티클을 찾지 못했습니다.');
  });

  test('추가 실패 - 추가하려는 사람이 글의 작성자가 아닌 경우', async () => {
    const userId = 'fail123';
    const mealArticleId = id;
    const meals = [
      {
        foodName: '그래놀라',
        quantity: 200,
      },
      {
        foodName: '우유',
        quantity: 100,
      },
    ];

    const mealArray = {
      meal_list: meals,
    };

    await expect(
      mealService.addOneMeal(userId, mealArticleId, mealArray)
    ).rejects.toThrow('작성자만 수정할 수 있습니다.');
  });
});

describe('식사 수정 TEST', () => {
  test('수정 성공', async () => {
    const userId = 'test123';
    const mealListId = m_id;
    const meals = [
      {
        foodName: '치킨',
        quantity: 250,
      },
      {
        foodName: '아메리카노',
        quantity: 150,
      },
    ];

    const result = await mealService.patchOneMeal(userId, mealListId, meals);

    // 수정된 내용 확인
    for (const mealArray of result!.meals) {
      // 수정된 부분만 찾아서 비교
      if ((mealArray as any)._id === m_id) {
        for (let i = 0; i < mealArray.meal_list.length; i++) {
          expect(mealArray.meal_list[i].foodName).toBe(meals[i].foodName);
          expect(mealArray.meal_list[i].quantity).toBe(meals[i].quantity);
        }
      }
    }
  });

  test('수정 실패 - 음식 이름이 비어있는 경우', async () => {
    const userId = 'test123';
    const mealListId = m_id;
    const meals = [
      {
        foodName: '',
        quantity: 250,
      },
      {
        foodName: '아메리카노',
        quantity: 150,
      },
    ];

    await expect(
      mealService.patchOneMeal(userId, mealListId, meals)
    ).rejects.toThrow('음식 이름이 반드시 필요합니다.');
  });

  test('수정 실패 - 음식 양이 음수인 경우', async () => {
    const userId = 'test123';
    const mealListId = m_id;
    const meals = [
      {
        foodName: '치킨',
        quantity: 250,
      },
      {
        foodName: '아메리카노',
        quantity: -150,
      },
    ];

    await expect(
      mealService.patchOneMeal(userId, mealListId, meals)
    ).rejects.toThrow('음식의 양은 반드시 양수여야 합니다.');
  });

  test('수정 실패 - 잘못된 식사 Id', async () => {
    const userId = 'test123';
    const mealListId = '62c7da69cf3f4d7ac490e2dd';
    const meals = [
      {
        foodName: '치킨',
        quantity: 250,
      },
      {
        foodName: '아메리카노',
        quantity: 150,
      },
    ];

    await expect(
      mealService.patchOneMeal(userId, mealListId, meals)
    ).rejects.toThrow('해당 아티클을 찾지 못했습니다.');
  });

  test('수정 실패 - 수정하려는 사람이 글의 작성자가 아닌 경우', async () => {
    const userId = 'fail123';
    const mealListId = m_id;
    const meals = [
      {
        foodName: '치킨',
        quantity: 250,
      },
      {
        foodName: '아메리카노',
        quantity: 150,
      },
    ];

    await expect(
      mealService.patchOneMeal(userId, mealListId, meals)
    ).rejects.toThrow('작성자만 수정할 수 있습니다.');
  });
});

describe('식사 삭제 TEST', () => {
  test('삭제 실패 - 잘못된 식사 Id', async () => {
    const userId = 'test123';
    const mealListId = '62c7da69cf3f4d7ac490e2dd';

    await expect(mealService.deleteOneMeal(userId, mealListId)).rejects.toThrow(
      '해당 아티클을 찾지 못했습니다.'
    );
  });

  test('삭제 실패 - 삭제하려는 사람이 글의 작성자가 아닌 경우', async () => {
    const userId = 'fail123';
    const mealListId = m_id;

    await expect(mealService.deleteOneMeal(userId, mealListId)).rejects.toThrow(
      '작성자만 수정할 수 있습니다.'
    );
  });

  test('삭제 성공', async () => {
    const userId = 'test123';
    const mealListId = m_id;

    const result = await mealService.deleteOneMeal(userId, mealListId);

    // 삭제된 결과 확인
    for (const mealArray of result!.meals) {
      expect((mealArray as any)._id).not.toBe(m_id);
    }
  });
});

describe('식단 글 삭제 TEST', () => {
  test('삭제 실패 - 잘못된 식단 글 Id', async () => {
    const userId = 'test123';
    const mealArticleId = '62c7da69cf3f4d7ac490e2dc';

    await expect(
      mealService.deleteMealArticle(userId, mealArticleId)
    ).rejects.toThrow('해당 아티클을 찾지 못했습니다.');
  });

  test('삭제 실패 - 삭제하려는 사람이 글의 작성자가 아닌 경우', async () => {
    const userId = 'fail123';
    const mealArticleId = id;

    console.log(id);
    await expect(
      mealService.deleteMealArticle(userId, mealArticleId)
    ).rejects.toThrow('작성자만 삭제할 수 있습니다.');
  });

  test('삭제 성공', async () => {
    const userId = 'test123';
    const mealArticleId = id;

    const result = await mealService.deleteMealArticle(userId, mealArticleId);

    expect(result).toEqual({ deletedCount: 1 });
  });
});

describe('식단 리스트 가져오기 TEST', () => {
  (async function () {
    for (let i = 0; i < 10; i++) {
      const userId = 'test123';
      const meals = [
        [
          {
            foodName: '짜장면',
            quantity: 300,
          },
          {
            foodName: '코카콜라',
            quantity: 500,
          },
        ],
        [
          {
            foodName: '치킨',
            quantity: 300,
          },
        ],
      ];
      const result = await mealService.addMealArticle(userId, meals);
    }
  })();

  test('성공 - 전체 리스트 가져오기', async () => {
    const mealArticleListAll = await mealService.getAllMealArticle();

    id = mealArticleListAll[0]._id.toString();

    expect(mealArticleListAll.length).toBe(10);
  });

  test('성공 - 유저 별 무한스크롤', async () => {
    const userId = 'test123';
    const limit = 5;
    const reqNumber = 0;

    const conditions = { limit, reqNumber };

    const mealArticleList = await mealService.getMealArticleListByUserId(
      userId as string,
      conditions
    );

    expect(mealArticleList.length).toBeLessThanOrEqual(limit);
  });

  test('성공 - 식단 글 가져오기', async () => {
    const mealArticleId = id;

    const mealArticle = await mealService.getMealArticleById(mealArticleId);

    expect(mealArticle).not.toBeNull();
  });

  test('실패 - 잘못된 글 id로 식단 글 가져오기', async () => {
    const mealArticleId = '62d1173e9b340f22719f504f';

    await expect(mealService.getMealArticleById(mealArticleId)).rejects.toThrow(
      '해당 아티클을 찾지 못했습니다.'
    );
  });
});
