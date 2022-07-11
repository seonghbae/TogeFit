import { routineModel, RoutineModel } from '../db';
import { userService } from './UserService';

export interface RoutineInfo {
  userId: string;
  routine_name: string;
  routine_list: Array<Exercise>;
}

interface Exercise {
  name: string;
  count?: number;
  set?: number;
  weight?: number;
}

class RoutineService {
  constructor(private routineModel: RoutineModel) {}

  async findByUserId(userId: string) {
    const foundRoutine = await this.routineModel.findByUserId(userId);
    return foundRoutine;
  }

  async findRoutineByObjectId(routineId: string) {
    const result = await this.routineModel.findRoutineByObjectId(routineId);
    return result;
  }

  async addRoutine(routineInfo: RoutineInfo) {
    const { userId, routine_name, routine_list } = routineInfo;
    // 검사 코드 추가

    const foundUser = await userService.findByUserId(userId);
    if (!foundUser) {
      throw new Error('해당 유저는 존재하지 않습니다.');
    }

    const newRoutine = {
      userId,
      routine_name,
      routine_list,
    };

    const createdNewRoutine = await this.routineModel.create(newRoutine);

    return createdNewRoutine;
  }

  async deleteRoutine(userId: string, routineId: string) {
    const foundRoutine = await this.routineModel.findRoutineByObjectId(
      routineId
    );

    if (!foundRoutine) {
      throw new Error('해당 루틴은 존재하지 않습니다.');
    }

    if (foundRoutine.userId !== userId) {
      throw new Error('작성자만 삭제할 수 있습니다.');
    }

    const deletedRoutine = await this.routineModel.deleteByRoutineId(routineId);
    return deletedRoutine;
  }

  async patchRoutine(
    userId: string,
    routineId: string,
    toUpdateInfo: Partial<RoutineInfo>
  ) {
    const foundRoutine = await this.routineModel.findRoutineByObjectId(
      routineId
    );

    if (!foundRoutine) {
      throw new Error('해당 루틴은 존재하지 않습니다.');
    }

    if (foundRoutine.userId !== userId) {
      throw new Error('작성자만 수정할 수 있습니다.');
    }

    const updatedRoutine = await this.routineModel.update(
      routineId,
      toUpdateInfo
    );

    return updatedRoutine;
  }
}
const routineService = new RoutineService(routineModel);

export { routineService };
