import { IDiet } from 'types/interfaces';
import { atom } from 'recoil';

const dietState = atom<IDiet>({
  key: 'dietState',
  default: {
    userId: '',
    meals: [],
    createdAt: '',
  },
});

export default dietState;
