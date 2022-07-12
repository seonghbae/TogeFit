import { atom } from 'recoil';

const dragTargetState = atom<string | number | null>({
  key: 'dragTargetState',
  default: '',
});

export default dragTargetState;
