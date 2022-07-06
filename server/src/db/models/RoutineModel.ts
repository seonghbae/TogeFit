import { model } from 'mongoose';
import { RoutineSchema } from '../schemas/RoutineSchema';

const RoutineList = model('routines', RoutineSchema);

export class RoutineModel {}

const routineModel = new RoutineModel();
export { routineModel };
