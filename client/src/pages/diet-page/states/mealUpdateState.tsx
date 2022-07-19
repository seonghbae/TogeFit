import { atom } from 'recoil';

const mealUpdateState = atom<boolean>({
  key: 'mealUpdateState',
  default: false,
});

export default mealUpdateState;
