import { atom } from 'recoil';
import { IRoutinesInfo } from 'types/interfaces';

const routinesState = atom<Array<IRoutinesInfo>>({
  key: 'routineState',
  default: [],
});

export default routinesState;
