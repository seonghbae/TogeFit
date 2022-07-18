import { atom } from 'recoil';

const searchQueryState = atom({
  key: 'searchQueryState',
  default: '',
});

export default searchQueryState;
