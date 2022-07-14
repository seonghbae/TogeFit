import { atom } from 'recoil';
import {
  IRoutines,
  IRoutinesExerciseInfo,
  IRoutinesInfo,
} from 'types/interfaces';

interface IRoutineModifyInfo extends IRoutinesInfo {
  exerciseIndex: number;
  routineIndex: number;
}

const routineModifyState = atom<IRoutineModifyInfo>({
  key: 'routineModifyState',
  default: undefined,
});

export default routineModifyState;
