import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { SearchForm } from '../../../common/components';
import useSearchRoutine from '../hooks/useSearchRoutine';
import { routinesState } from '../states';
import * as SC from './HeaderStyle';

const Header = () => {
  const [routines, setRoutines] = useRecoilState(routinesState);
  const { result, getRoutineList } = useSearchRoutine();

  useEffect(() => {
    setRoutines(result?.data);
  }, [result]);
  return (
    <SC.HeaderWrapper>
      <SearchForm searchFunc={getRoutineList} />
      <button type="button">+</button>
    </SC.HeaderWrapper>
  );
};

export default Header;
