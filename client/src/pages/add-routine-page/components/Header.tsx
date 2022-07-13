import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SearchForm } from '../../../common/components';
import useSearchExercise from '../hooks/useSearchExercise';
import { exerciseState } from '../states';

import AddExerciseModal from './AddExerciseModal';
// import AddExerciseModal from './AddExerciseModal';
import * as SC from './HeaderStyle';

const Header = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [exercise, setExercise] = useRecoilState(exerciseState);

  const { searchExercise, result } = useSearchExercise();
  const handleAddBtn = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    const searchedExercise = result?.data.map((item) => item.name) || [null];
    setExercise(searchedExercise);
  }, [result]);

  return (
    <SC.HeaderWrapper>
      <h1>내 루틴 만들기</h1>
      <SearchForm searchFunc={searchExercise} />
      <button type="button" onClick={handleAddBtn}>
        +
      </button>
      <AddExerciseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
    </SC.HeaderWrapper>
  );
};

export default Header;
