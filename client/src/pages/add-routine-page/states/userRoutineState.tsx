import { ROUTINE_INITIAL_MESSAGE } from 'common/constants';
import { atom } from 'recoil';

type Idata = {
  name: string;
  count?: string;
  set?: string;
  weight?: string;
};

const userRoutineState = atom<Idata[]>({
  key: 'userRoutineState',
  default: [
    {
      name: ROUTINE_INITIAL_MESSAGE,
    },
  ],
});

export default userRoutineState;
