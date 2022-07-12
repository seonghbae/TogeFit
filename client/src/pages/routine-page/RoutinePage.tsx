/* eslint-disable no-underscore-dangle */
import { getUserId } from 'common/utils/getUserId';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IRoutinesInfo } from 'types/interfaces';
import { Routine, Header } from './components';
import useRoutineList from './hooks/useRoutineList';
import { routinesState } from './states';
import * as SC from './style';

const RoutinePage = () => {
  const { getRoutineList, result } = useRoutineList();
  const [routines, setRoutines] = useRecoilState(routinesState);

  useEffect(() => {
    getRoutineList();
  }, []);

  useEffect(() => {
    setRoutines(result?.data.routines);
  }, [result]);
  return (
    <SC.Wrapper>
      <Header />
      <SC.RoutineWrapper>
        {typeof routines === 'object' &&
          routines.map((routine) => <Routine key={routine._id} {...routine} />)}
      </SC.RoutineWrapper>
    </SC.Wrapper>
  );
};

export default RoutinePage;
