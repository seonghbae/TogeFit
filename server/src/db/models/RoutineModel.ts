import { model } from 'mongoose';
import { RoutineSchema } from '../schemas/RoutineSchema';

const Routine = model('routines', RoutineSchema);

interface RoutineInfo {
  userId: string;
  routine_name: string;
  routine_list: Array<Object>;
}
export class RoutineModel {
  async findByRoutineName(routineName: string) {
    const foundRoutine = await Routine.findOne({
      routine_name: routineName,
    });
    return foundRoutine;
  }

  async findByUserId(userId: string) {
    const foundRoutine = await Routine.findOne({
      userId,
    });
    return foundRoutine;
  }

  async create(routineInfo: RoutineInfo) {
    const { userId, routine_name, routine_list } = routineInfo;
    const routines = { routine_name, routine_list };

    const foundRoutine = await this.findByUserId(userId);
    if (!foundRoutine) {
      const createdNewRoutine = await Routine.create(routineInfo);
    }
    const filter = { userId };
    const update = { $push: { routines } };
    let updatedNewRoutine = await Routine.findOneAndUpdate(filter, update);

    console.log(updatedNewRoutine);
    return updatedNewRoutine;
  }
}

const routineModel = new RoutineModel();
export { routineModel };
