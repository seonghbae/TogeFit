import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <h2>루틴 목록</h2>
      <SC.Search>
        <SearchForm searchFunc={getRoutineList} />
        <Link to="/routine/add">
          <button type="button">+</button>
        </Link>
      </SC.Search>
    </SC.HeaderWrapper>
  );
};

export default Header;
