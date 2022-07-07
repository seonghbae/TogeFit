import { model } from 'mongoose';
import { Mongoose } from 'mongoose';
import { RoutineSchema } from '../schemas/RoutineSchema';
import { RoutineInfo } from '../../services/RoutineService';

const Routine = model('routines', RoutineSchema);
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

  async findRoutineByObjectId(routineId: string) {
    const result = await Routine.findOne({
      'routines._id': routineId,
    });
    return result;
  }

  async create(routineInfo: RoutineInfo) {
    const { userId, routine_name, routine_list } = routineInfo;
    const routines = { routine_name, routine_list };

    const foundRoutine = await this.findByUserId(userId);

    // 유저의 루틴이 아직 존재하지 않으면 빈 배열 생성
    if (!foundRoutine) {
      const createdNewRoutine = await Routine.create(routineInfo);
    }

    // routines 배열에 routine 푸쉬
    const filter = { userId };
    const update = { $push: { routines } };
    const updatedNewRoutine = await Routine.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedNewRoutine;
  }

  async deleteByRoutineId(routineId: string) {
    const deletedRoutine = await Routine.updateOne(
      { 'routines._id': routineId },
      {
        $pull: {
          routines: { _id: routineId },
        },
      }
    );

    return deletedRoutine;
  }

  async update(routineId: string, toUpdateInfo: Partial<RoutineInfo>) {
    let processedRoutineInfo: any = {};
    if (toUpdateInfo.routine_name) {
      processedRoutineInfo['routines.$.routine_name'] =
        toUpdateInfo.routine_name;
    }

    if (toUpdateInfo.routine_list) {
      processedRoutineInfo['routines.$.routine_list'] =
        toUpdateInfo.routine_list;
    }

    const updatedRoutine = await Routine.updateOne(
      { 'routines._id': routineId },
      {
        $set: processedRoutineInfo,
      }
    );
    return updatedRoutine;
  }
}

const routineModel = new RoutineModel();
export { routineModel };
