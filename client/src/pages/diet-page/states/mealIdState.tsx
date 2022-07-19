import { atom } from 'recoil';

const mealIdState = atom<string>({
  key: 'mealIdState',
  default: '',
});

export default mealIdState;
