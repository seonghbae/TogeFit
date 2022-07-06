import { model } from 'mongoose';
import { RoutineSchema } from '../schemas/RoutineSchema';

const RoutineList = model('routines', RoutineSchema);

export class RoutineModel {
  async findByRoutineName(routineName: string) {
    const foundRoutine = await RoutineList.findOne({
      routine_name: routineName,
    });
    return foundRoutine;
  }
}

const routineModel = new RoutineModel();
export { routineModel };
