import { atom } from 'recoil';
import { PostResponse } from 'types/interfaces';

const postState = atom<PostResponse>({
  key: 'postState',
  default: undefined,
});

export default postState;
