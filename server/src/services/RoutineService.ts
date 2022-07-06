import { routineModel, RoutineModel } from '../db';

interface RoutineInfo {
  userId: string;
  routine_name: string;
  routine_list: Array<Object>;
}
class RoutineService {
  constructor(private routineModel: RoutineModel) {}

  async findByRoutineName(routineName: string) {
    const foundRoutine = await this.routineModel.findByRoutineName(routineName);
    return foundRoutine;
  }

  async addRoutine(routineInfo: RoutineInfo) {
    const { userId, routine_name, routine_list } = routineInfo;

    // 검사 코드 추가

    const newRoutine = {
      user: userId,
      routine_name,
      routine_list,
    };

    const createdNewRoutine = await this.routineModel.create(newRoutine);

    return createdNewRoutine;
  }
}
const routineService = new RoutineService(routineModel);

export { routineService };
