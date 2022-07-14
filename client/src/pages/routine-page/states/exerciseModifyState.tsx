import { atom } from 'recoil';
import {
  IRoutines,
  IRoutinesExerciseInfo,
  IRoutinesInfo,
} from 'types/interfaces';

const exerciseModifyState = atom<IRoutinesExerciseInfo | undefined>({
  key: 'exerciseModifyState',
  default: undefined,
});

export default exerciseModifyState;
