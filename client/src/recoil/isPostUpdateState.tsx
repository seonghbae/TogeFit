import { atom } from 'recoil';

const isPostUpdateState = atom<boolean>({
  key: 'isPostUpdateState',
  default: false,
});

export default isPostUpdateState;
