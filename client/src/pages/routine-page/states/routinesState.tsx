import { atom } from 'recoil';
import {
  IRoutines,
  IRoutinesExerciseInfo,
  IRoutinesInfo,
} from 'types/interfaces';

const routinesState = atom<IRoutinesInfo[] | undefined>({
  key: 'routinesState',
  default: undefined,
});

export default routinesState;
