import { routineModel, RoutineModel } from '../db';

interface RoutineInfo {
  userId: string;
  routine_name: string;
  routine_list: Array<Object>;
}
class RoutineService {
  constructor(private routineModel: RoutineModel) {}

  async findByUserId(userId: string) {
    const foundRoutine = await this.routineModel.findByUserId(userId);
    return foundRoutine;
  }

  async addRoutine(routineInfo: RoutineInfo) {
    const { userId, routine_name, routine_list } = routineInfo;
    // 검사 코드 추가
    const newRoutine = {
      userId,
      routine_name,
      routine_list,
    };

    const createdNewRoutine = await this.routineModel.create(newRoutine);

    return createdNewRoutine;
  }
}
const routineService = new RoutineService(routineModel);

export { routineService };
