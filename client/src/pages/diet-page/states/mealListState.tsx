import { MEAL_INITIAL_MESSAGE } from 'common/constants';
import { IMeal } from 'types/interfaces';
import { atom } from 'recoil';

const mealListState = atom<IMeal[]>({
  key: 'mealListState',
  default: [
    {
      foodName: MEAL_INITIAL_MESSAGE,
      quantity: 0,
    },
  ],
});

export default mealListState;
