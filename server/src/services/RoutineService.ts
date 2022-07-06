import { routineModel, RoutineModel } from '../db';
class RoutineService {
  constructor(private routineModel: RoutineModel) {}

  async findByRoutineName(routineName: string) {
    const foundRoutine = await this.routineModel.findByRoutineName(routineName);
    return foundRoutine;
  }

  async addRoutine({ userId, routine_name, routine_list }) {}
}
const routineService = new RoutineService(routineModel);

export { routineService };
