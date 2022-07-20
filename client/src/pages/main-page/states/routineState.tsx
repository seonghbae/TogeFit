import { atom } from 'recoil';
import { IRoutinesInfo } from 'types/interfaces';

const routinesState = atom<IRoutinesInfo>({
  key: 'routineState',
  default: {
    routine_name: '',
    routine_list: [],
    _id: '',
  },
});

export default routinesState;
