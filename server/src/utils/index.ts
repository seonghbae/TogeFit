import { Exercise } from '../services/RoutineService';

export const getTagList = (tagList: string) => {
  const newTagList = tagList.split(',');
  const appendTagKeyList = newTagList.map((tagName: string) => {
    return { tag: tagName };
  });
  return appendTagKeyList;
};

export const getPostImageList = (files: {
  [fieldname: string]: Express.Multer.File[];
}) => {
  const fileArray: any = files;
  const postImages: Array<string> = [];
  fileArray.map((data: any) => postImages.push(data.location));
  return postImages;
};

export const checkRoutine = (routineList: Array<Exercise>) => {
  const newRoutineListArray: Array<Exercise> = [];
  for (let i = 0; i < routineList.length; i++) {
    if (!routineList[i].name) {
      throw new Error('운동 이름이 반드시 필요합니다.');
    }
    const newRoutineList: Exercise = { name: routineList[i].name };

    if (routineList[i].count) {
      checkType(typeof routineList[i].count);
      checkCount(routineList[i].count as number);
    }

    newRoutineList.count = routineList[i].count;

    if (routineList[i].set) {
      checkType(typeof routineList[i].set);
      checkCount(routineList[i].set as number);
    }
    newRoutineList.set = routineList[i].set;

    if (routineList[i].weight) {
      checkType(typeof routineList[i].weight);
      checkCount(routineList[i].weight as number);
    }

    newRoutineList.weight = routineList[i].weight;
    newRoutineListArray.push(newRoutineList);
  }

  return newRoutineListArray;
};

const checkType = (value: any) => {
  if (value !== 'number') {
    throw new Error('올바르지 않은 값입니다.');
  }
};

const checkCount = (count: number) => {
  if (count <= 0) {
    throw new Error('0보다 큰 숫자를 입력해주세요.');
  }
};
