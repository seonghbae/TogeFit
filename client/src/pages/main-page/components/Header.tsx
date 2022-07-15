import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SearchForm } from '../../../common/components';
// import useSearchExercise from '../hooks/useSearchExercise';
// import { exerciseState } from '../states';

import * as SC from './HeaderStyle';

const Header = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [exercise, setExercise] = useRecoilState(exerciseState);

  // const { searchExercise, result } = useSearchExercise();
  const handleAddBtn = () => {
    setIsOpen(true);
  };
  // useEffect(() => {
  //   const searchedExercise = result?.data.map((item) => item.name) || [null];
  //   setExercise(
  //     searchedExercise.length ? searchedExercise : ['검색 값이 없습니다.']
  //   );
  // }, [result]);

  return (
    <SC.HeaderWrapper>
      <SC.Search>
        <SearchForm searchFunc={() => console.log('search')} />
      </SC.Search>
    </SC.HeaderWrapper>
  );
};

export default Header;
