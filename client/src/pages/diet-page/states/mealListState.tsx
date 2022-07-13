import { MEAL_INITIAL_MESSAGE } from 'common/constants';
import { atom } from 'recoil';

type Meal = {
  foodName: string;
  quantity?: number;
};

const mealListState = atom<Meal[]>({
  key: 'mealListState',
  default: [
    {
      foodName: MEAL_INITIAL_MESSAGE,
    },
  ],
});

export default mealListState;
