import { atom } from 'recoil';

const dietAddState = atom<boolean>({
  key: 'dietAddState',
  default: false,
});

export default dietAddState;
