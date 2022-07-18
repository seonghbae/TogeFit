import { atom } from 'recoil';

const exerciseState = atom<Array<string | number | null>>({
  key: 'exerciseState',
  default: ['로딩 중...'],
});

export default exerciseState;
