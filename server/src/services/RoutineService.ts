import { routineModel, RoutineModel } from '../db';
class RoutineService {
  constructor(private routineMoel: RoutineModel) {}
}
const routineService = new RoutineService(routineModel);

export { routineService };
