import { exerciseListModel, ExerciseListModel } from '../db';
class ExerciseService {
  constructor(private exerciseListModel: ExerciseListModel) {}

  async findByExerciseName(exercise: string) {
    const foundExercise = await this.exerciseListModel.findByExerciseName(
      exercise
    );
  }

  async getExerciseList() {
    const exerciseList = await this.exerciseListModel.findAllExercise();
    return exerciseList;
  }

  async addExercise(exercise: string) {
    // 검색 코드 추가
    const newExercise = await this.exerciseListModel.create(exercise);

    return newExercise;
  }
}
const exerciseListService = new ExerciseService(exerciseListModel);

export { exerciseListService };
