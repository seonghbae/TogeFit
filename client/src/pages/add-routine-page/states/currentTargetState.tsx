import { atom } from 'recoil';

const currentTargetState = atom<number>({
  key: 'currentTargetState',
  default: 0,
});

export default currentTargetState;
