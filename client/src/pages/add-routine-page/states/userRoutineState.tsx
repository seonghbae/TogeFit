import { ROUTINE_INITIAL_MESSAGE } from 'common/constants';
import { atom } from 'recoil';
import { IRoutinesExerciseInfo } from 'types/interfaces';

const userRoutineState = atom<IRoutinesExerciseInfo[]>({
  key: 'userRoutineState',
  default: [
    {
      name: ROUTINE_INITIAL_MESSAGE,
    },
  ],
});

export default userRoutineState;
