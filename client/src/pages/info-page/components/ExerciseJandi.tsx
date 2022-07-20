/* eslint-disable no-nested-ternary */
import getPadString from 'common/utils/getPadString';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from 'styled-icons/material-outlined';
import { Dumbbell as NoDumbbell } from 'styled-icons/fluentui-system-regular';
import { Dumbbell as YesDumbbell } from 'styled-icons/fluentui-system-filled';
import * as SC from './ExerciseJandiStyle';
import useJandi from '../hook/useJandi';

const ExerciseJandi = () => {
  const { dateObject, jandiList, changeDate } = useJandi();

  return (
    <SC.Wrapper>
      <SC.Title>
        <KeyboardArrowLeft
          onClick={() => {
            changeDate('left');
          }}
        />
        {`${dateObject.year}.${getPadString(dateObject.month + 1, 2, '0')}`}
        <KeyboardArrowRight
          onClick={() => {
            changeDate('right');
          }}
        />
      </SC.Title>
      <SC.DaySpan>Sun</SC.DaySpan>
      <SC.DaySpan sat>Sat</SC.DaySpan>
      <SC.JandiContainer>
        {/* <SC.JandiItem key={Math.random()} active={jandi.isActive} /> */}

        {jandiList.map((jandi) =>
          jandi.isNow ? (
            jandi.isActive ? (
              <YesDumbbell size="30px" color="green" />
            ) : (
              <NoDumbbell size="30px" color="" />
            )
          ) : (
            <div key={Math.random()} />
          )
        )}
      </SC.JandiContainer>
    </SC.Wrapper>
  );
};

export default ExerciseJandi;
