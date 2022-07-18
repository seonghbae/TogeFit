import getPadString from 'common/utils/getPadString';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from 'styled-icons/material-outlined';
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
        {jandiList.map((jandi) =>
          jandi.isNow ? (
            <SC.JandiItem key={Math.random()} active={jandi.isActive} />
          ) : (
            <div key={Math.random()} />
          )
        )}
      </SC.JandiContainer>
    </SC.Wrapper>
  );
};

export default ExerciseJandi;
