import { exerciseListModel, ExerciseListModel } from '../db';
class ExerciseService {
  constructor(private exerciseListModel: ExerciseListModel) {}

  async findByExerciseName(exercise: string) {
    const foundExercise = await this.exerciseListModel.findByExerciseName(
      exercise
    );
    return foundExercise;
  }

  async searchExercise(keyword: string) {
    const exerciseList = await this.exerciseListModel.searchExercise(keyword);
    return exerciseList;
  }

  async getExerciseList() {
    const exerciseList = await this.exerciseListModel.findAllExercise();
    return exerciseList;
  }

  async addExercise(exercise: string) {
    // 검색 코드 추가

    if (exercise.length == 0) {
      throw new Error('한 글자 이상 입력이 반드시 필요합니다.');
    }

    const foundExercise = await this.exerciseListModel.findByExerciseName(
      exercise
    );

    if (foundExercise) {
      throw new Error('해당 운동은 이미 존재합니다.');
    }

    const newExercise = await this.exerciseListModel.create(exercise);

    return newExercise;
  }

  async deleteExercise(exercise: string) {
    if (exercise.length == 0) {
      throw new Error('한 글자 이상 입력이 반드시 필요합니다.');
    }

    const foundExercise = await this.exerciseListModel.findByExerciseName(
      exercise
    );

    if (!foundExercise) {
      throw new Error('해당 운동을 찾지 못했습니다.');
    }
    const newExercise = await this.exerciseListModel.delete(exercise);
    return newExercise;
  }
}
const exerciseListService = new ExerciseService(exerciseListModel);

export { exerciseListService };
