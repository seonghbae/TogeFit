import * as db from './utils/db';
import { userService, routineService, Routine } from '../src/services';

let routineId: string = '';

beforeAll(async () => {
  await db.connect();
  const userList = [
    { name: 'dodo', nickname: 'dodo_bird', userId: 'test1', password: '1234' },
    { name: 'elice', nickname: 'princess', userId: 'test2', password: '1234' },
    { name: 'tom', nickname: 'toto', userId: 'test3', password: '1234' },
  ];

  for (const user of userList) {
    await userService.addUser(user);
  }

  const routineList = [
    {
      userId: 'test1',
      routine_name: '하체 운동',
      routine_list: [
        { name: '스쿼트', count: 15, set: 5, weight: 50 },
        { name: '레그 프레스', count: 10, set: 5, weight: 100 },
      ],
    },
    {
      userId: 'test2',
      routine_name: '상체 운동',
      routine_list: [
        { name: '렛 풀 다운', count: 10, set: 5 },
        { name: '턱걸이', count: 50 },
        { name: '팔굽혀펴기', count: 30, set: 6 },
      ],
    },
    {
      userId: 'test3',
      routine_name: '등 루틴',
      routine_list: [
        { name: '체스트 프레스', count: 20, set: 5 },
        { name: '덤벨 풀오버', count: 20, set: 3, weight: 30 },
        { name: '데드리프트', count: 20, set: 5, weight: 100 },
      ],
    },
  ];

  for (const routine of routineList) {
    await routineService.addRoutine(routine);
  }
});
afterAll(async () => await db.close());

describe('유저 아이디로 루틴 가져오기 TEST', () => {
  test('루틴 가져오기 성공', async () => {
    const routine = await routineService.findByUserId('test1');
    const routineInfo = routine?.routines[0] as Routine;
    routineId = routineInfo._id.toString() as string;
    expect(routine?.userId).toBe('test1');
  });
  test('루틴 가져오기 실패 - 존재하지 않는 유저', async () => {
    const routine = await routineService.findByUserId('test4');
    expect(routine).toBeNull();
  });
});

describe('루틴 ID(Object Id)로 루틴 가져오기 TEST', () => {
  test('루틴 가져오기 성공', async () => {
    const routine = await routineService.findRoutineByObjectId(routineId);
    const routineInfo = routine?.routines[0] as Routine;
    expect(routineInfo._id.toString()).toEqual(routineId);
  });
  test('루틴 가져오기 실패 - 잘못된 형식의 Id', async () => {
    const failId = 'testId';
    await expect(
      routineService.findRoutineByObjectId(failId)
    ).rejects.toThrow();
  });
});

describe('루틴 검색 TEST', () => {
  test('루틴 검색 성공', async () => {
    const userId = 'test1';
    const keyword = '하체';
    const routine = await routineService.searchRoutine(userId, keyword);
    expect(routine[0].routines[0].routine_name).toEqual('하체 운동');
  });

  test('루틴 검색 실패 - 존재하지 않는 유저를 넣을 경우', async () => {
    const userId = 'failId';
    const keyword = '하체';
    await expect(
      routineService.searchRoutine(userId, keyword)
    ).rejects.toThrow();
  });
  test('루틴 검색 실패 - 루틴 목록에 없는 경우', async () => {
    const userId = 'test1';
    const keyword = '간식';
    const routine = await routineService.searchRoutine(userId, keyword);
    expect(routine[0].routines.length).toBe(0);
  });
  test('루틴 검색 실패 - 비어 있는 keyword', async () => {
    const userId = 'test1';
    const keyword = '';
    const routine = await routineService.searchRoutine(userId, keyword);
    expect(routine.length).toBe(1);
  });
});

describe('루틴 추가 TEST', () => {
  test('루틴 추가 성공', async () => {
    const userId = 'test1';
    const routine_name = '매일 할 운동 루틴';
    const routine_list = [
      {
        name: '덤벨 들기',
        count: 20,
        set: 4,
        weight: 15,
      },
      {
        name: '레터럴 레이즈',
        count: 15,
        set: 3,
        weight: 10,
      },
    ];

    const createdRoutine = await routineService.addRoutine({
      userId,
      routine_name,
      routine_list,
    });

    const compRoutine = createdRoutine?.routines[1];
    expect(compRoutine?.routine_name).toEqual('매일 할 운동 루틴');

    const compRoutineList = compRoutine?.routine_list;

    expect(compRoutineList).toMatchObject(routine_list);
  });

  test('루틴 추가 실패 - 존재 하지 않는 유저 ID', async () => {
    const userId = 'failId';
    const routine_name = '매일 할 운동 루틴';
    const routine_list = [
      {
        name: '덤벨 들기',
        count: 20,
        set: 4,
        weight: 15,
      },
    ];

    await expect(
      routineService.addRoutine({ userId, routine_name, routine_list })
    ).rejects.toThrow('해당 유저를 찾지 못했습니다.');
  });

  test('루틴 추가 실패 - 루틴에서 운동 이름이 없을 경우', async () => {
    const userId = 'test1';
    const routine_name = '이름 없는 루틴';
    const routine_list = [
      {
        name: '',
        count: 20,
        set: 4,
        weight: 15,
      },
    ];

    await expect(
      routineService.addRoutine({ userId, routine_name, routine_list })
    ).rejects.toThrow('운동 이름이 반드시 필요합니다.');
  });

  test('루틴 추가 실패 - count, set, weight 중 음수가 들어갈 경우', async () => {
    const userId = 'test1';
    const routine_name = '이름 없는 루틴';
    const routine_list = [
      {
        name: '스쿼트',
        count: -3,
        set: 4,
        weight: 15,
      },
    ];

    await expect(
      routineService.addRoutine({ userId, routine_name, routine_list })
    ).rejects.toThrow('0보다 큰 숫자를 입력해주세요.');
  });
});

describe('루틴 삭제 TEST', () => {
  test('루틴 삭제 성공', async () => {
    const userId = 'test1';
    const deletedRoutine = await routineService.deleteRoutine(
      userId,
      routineId
    );
    expect(deletedRoutine.modifiedCount).toBe(1);
  });
  test('루틴 삭제 실패 - 존재 하지 않는 루틴의 ObjectID', async () => {
    const userId = 'test1';
    const failObejctId = '62d60cd54781a19bddb19310';

    await expect(
      routineService.deleteRoutine(userId, failObejctId)
    ).rejects.toThrow('해당 루틴을 찾지 못했습니다.');
  });

  test('루틴 삭제 실패 - 작성자가 아닌 다른이의 삭제 요청', async () => {
    const userId = 'test1';
    const routine_name = '루틴 테스트';
    const routine_list = [
      {
        name: '덤벨 들기',
        count: 20,
        set: 4,
        weight: 15,
      },
    ];

    const createdRoutine = await routineService.addRoutine({
      userId,
      routine_name,
      routine_list,
    });
    const failId = 'failId';
    const routineInfo = createdRoutine?.routines[0] as Routine;
    routineId = routineInfo._id.toString() as string;

    await expect(
      routineService.deleteRoutine(failId, routineId)
    ).rejects.toThrow('작성자만 삭제할 수 있습니다.');
  });
});

describe('루틴 수정 TEST', () => {
  test('루틴 수정 성공', async () => {
    const userId = 'test1';
    const toUpdateInfo = {
      routine_list: [
        {
          name: '자전거 타기',
        },
        {
          name: '야외 달리기',
        },
      ],
    };
    const updatedRoutine = await routineService.patchRoutine(
      userId,
      routineId,
      toUpdateInfo
    );

    expect(updatedRoutine.modifiedCount).toBe(1);
  });
  test('루틴 수정 실패 - 존재 하지 않는 루틴의 ObjectID', async () => {
    const userId = 'test1';
    const failRoutineId = '62d60cd54781a19bddb19310';
    const toUpdateInfo = {
      routine_list: [
        {
          name: '자전거 타기',
        },
      ],
    };

    await expect(
      routineService.patchRoutine(userId, failRoutineId, toUpdateInfo)
    ).rejects.toThrow('해당 루틴을 찾지 못했습니다.');
  });

  test('루틴 수정 실패 - 작성자가 아닌 다른이의 수정 요청', async () => {
    const userId = 'failtest';
    const toUpdateInfo = {
      routine_list: [
        {
          name: '자전거 타기',
        },
      ],
    };

    await expect(
      routineService.patchRoutine(userId, routineId, toUpdateInfo)
    ).rejects.toThrow('작성자만 수정할 수 있습니다.');
  });
});
