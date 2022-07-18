import { model } from 'mongoose';
import { ExcerciseListSchema } from '../schemas/ExcerciseListSchema';

const ExerciseList = model('exerciseLists', ExcerciseListSchema);
export class ExerciseListModel {
  async findAllExercise() {
    const exerciseList = await ExerciseList.find({});
    return exerciseList;
  }
  async findByExerciseName(exercise: string) {
    const foundExercise = await ExerciseList.findOne({ name: exercise });
    return foundExercise;
  }

  async searchExercise(keyword: string) {
    if (!keyword) {
      const getAllExercise = await this.findAllExercise();
      return getAllExercise;
    }
    const findBykeyword = await ExerciseList.find({
      name: { $regex: `.*${keyword}.*` },
    });
    return findBykeyword;
  }

  async create(exercise: string) {
    const createdNewExercise = await ExerciseList.create({ name: exercise });
    return createdNewExercise;
  }

  async delete(exercise: string) {
    const deletedExercise = await ExerciseList.deleteOne({ name: exercise });
    return deletedExercise;
  }
}

const exerciseListModel = new ExerciseListModel();
export { exerciseListModel };
