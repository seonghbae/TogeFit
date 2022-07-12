import { atom } from 'recoil';

const foodState = atom<Array<string | number | null>>({
  key: 'foodState',
  default: ['로딩 중...'],
});

export default foodState;
