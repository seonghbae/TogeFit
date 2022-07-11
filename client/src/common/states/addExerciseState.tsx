import { atom } from 'recoil';

const addExerciseState = atom({
  key: 'addExerciseState',
  default: false,
});

export default addExerciseState;
