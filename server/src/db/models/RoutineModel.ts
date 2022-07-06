import { model } from 'mongoose';
import { RoutineSchema } from '../schemas/RoutineSchema';

const Routine = model('routines', RoutineSchema);

interface RoutineInfo {
  user: string;
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

  async create(routineInfo: RoutineInfo) {
    const createdNewRoutine = await Routine.create(routineInfo);
    return createdNewRoutine;
  }
}

const routineModel = new RoutineModel();
export { routineModel };
