import { IDiet } from 'types/interfaces';
import { atom } from 'recoil';

const dietState = atom<IDiet>({
  key: 'dietState',
  default: {
    userId: '',
    meals: [],
    id: '',
    createdAt: '',
  },
});

export default dietState;
