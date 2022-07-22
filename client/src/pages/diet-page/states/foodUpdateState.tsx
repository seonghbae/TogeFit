import { atom } from 'recoil';

const foodUpdateState = atom<string | number | null>({
  key: 'foodUpdateState',
  default: '',
});

export default foodUpdateState;
