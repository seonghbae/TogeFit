import { atom } from 'recoil';
import { PostResponse } from 'types/interfaces';

const postState = atom<PostResponse>({
  key: 'postState',
  default: {
    _id: '',
    userId: '',
    contents: '',
    post_image: [],
    is_open: false,
    tag_list: [],
    like: 0,
    comments: [],
    meal_info: [],
    routine_info: [],
    message: '',
  },
});

export default postState;
