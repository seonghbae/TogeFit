import { atom } from 'recoil';

const dietUpdateState = atom<boolean>({
  key: 'dietUpdateState',
  default: false,
});

export default dietUpdateState;
