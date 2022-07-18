import { atom } from 'recoil';

const dietIdState = atom<string>({
  key: 'dietIdState',
  default: '',
});

export default dietIdState;
