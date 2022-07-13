import { MEAL_INITIAL_MESSAGE } from 'common/constants';
import { atom } from 'recoil';

type IMeal = {
  foodName: string;
  quantity?: number;
};

const mealListState = atom<IMeal[]>({
  key: 'mealListState',
  default: [
    {
      foodName: MEAL_INITIAL_MESSAGE,
    },
  ],
});

export default mealListState;
