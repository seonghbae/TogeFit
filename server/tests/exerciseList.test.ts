import * as db from './utils/db';
import { exerciseListService } from '../src/services';

beforeAll(async () => {
  await db.connect();

  const exerciseListArray = [
    '스쿼트',
    '레그 프레스',
    '달리기',
    '장거리 달리기',
    '렛 풀 다운',
  ];

  for (const exercise of exerciseListArray) {
    await exerciseListService.addExercise(exercise);
  }
});
afterAll(async () => await db.close());

describe('운동 이름으로 검색 TEST', () => {
  test('운동 이름 검색 성공', async () => {
    const exercise = await exerciseListService.findByExerciseName('스쿼트');
    expect(exercise?.name).toEqual('스쿼트');
  });

  test('운동 이름 검색 실패 - 운동 목록에 없는 경우', async () => {
    const exercise = await exerciseListService.findByExerciseName('크런치');
    expect(exercise).toBeNull();
  });

  test('운동 이름 검색 실패 - 비어있는 값', async () => {
    const exercise = await exerciseListService.findByExerciseName('');
    expect(exercise).toBeNull();
  });
});

describe('키워드로 운동 검색 TEST', () => {
  test('키워드로 운동 검색 성공', async () => {
    const keyword = '스';
    const result = await exerciseListService.searchExercise(keyword);
    expect(result.length).toBe(2);
  });

  test('비어있는 키워드를 검색할 경우', async () => {
    const keyword = '';
    const result = await exerciseListService.searchExercise(keyword);
    expect(result.length).toBe(5);
  });

  test('키워드로 운동 검색 실패 - 띄어쓰기에 걸리는 검색 키워드', async () => {
    const keywords = ['렛풀', '렛풀다', '풀다', '렛풀다운'];
    for (const keyword of keywords) {
      const result = await exerciseListService.searchExercise(keyword);

      expect(result.length).toBe(0);
    }
  });

  test('키워드로 운동 검색 실패 - 존재하지 않는 키워드', async () => {
    const result = await exerciseListService.searchExercise('아령');
    expect(result.length).toBe(0);
  });
});

describe('운동 리스트 가져오기 TEST', () => {
  test('운동 리스트 가져오기 성공', async () => {
    const result = await exerciseListService.getExerciseList();
    expect(result.length).toBe(5);
  });
});

describe('운동 추가 TEST', () => {
  test('운동 추가 성공', async () => {
    const result = await exerciseListService.addExercise('레그 레이즈');
    expect(result.name).toEqual('레그 레이즈');
  });

  test('운동 추가 실패 - 빈 값을 입력하는 경우', async () => {
    await expect(exerciseListService.addExercise('')).rejects.toThrow(
      '한 글자 이상 입력이 반드시 필요합니다.'
    );
  });

  test('운동 추가 실패 - 이미 운동명이 존재하는 경우', async () => {
    await expect(
      exerciseListService.addExercise('레그 레이즈')
    ).rejects.toThrow('해당 운동은 이미 존재합니다.');
  });
});

describe('운동 삭제 TEST', () => {
  test('운동 삭제 성공', async () => {
    const result = await exerciseListService.deleteExercise('레그 레이즈');
    const exerciseList = await exerciseListService.getExerciseList();
    expect(exerciseList.length).toBe(5);
    expect(result.deletedCount).toBe(1);
  });

  test('운동 삭제 실패 - 빈 값을 입력하는 경우', async () => {
    await expect(exerciseListService.deleteExercise('')).rejects.toThrow(
      '한 글자 이상 입력이 반드시 필요합니다.'
    );
  });

  test('운동 삭제 실패 - 해당 운동명을 찾지 못한 경우', async () => {
    await expect(
      exerciseListService.deleteExercise('레그 레이즈')
    ).rejects.toThrow('해당 운동을 찾지 못했습니다.');
  });
});
