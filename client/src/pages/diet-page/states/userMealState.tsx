import { MEAL_INITIAL_MESSAGE } from 'common/constants';
import { atom } from 'recoil';

type IData = {
  name: string;
  quantity?: string;
};

const userMealState = atom<IData[]>({
  key: 'userMealState',
  default: [
    {
      name: MEAL_INITIAL_MESSAGE,
    },
  ],
});

export default userMealState;
