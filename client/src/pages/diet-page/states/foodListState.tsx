import { atom } from 'recoil';

const foodListState = atom<Array<string | number | null>>({
  key: 'foodState',
  default: ['로딩 중...'],
});

export default foodListState;
