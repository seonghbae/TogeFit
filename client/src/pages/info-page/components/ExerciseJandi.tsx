import { nanoid } from 'nanoid';

import { JandiType } from 'recoil/infoState';
import * as SC from './ExerciseJandiStyle';

interface JandiProps {
  jandiList: JandiType[];
  children?: JSX.Element;
}

const ExerciseJandi = ({ jandiList, children }: JandiProps) => (
  <SC.Wrapper>
    {children}
    <SC.DaySpan>Sun</SC.DaySpan>
    <SC.DaySpan sat>Sat</SC.DaySpan>
    <SC.JandiContainer>
      {jandiList.map((jandi) =>
        jandi.isNow ? (
          <SC.JandiItem key={nanoid()} active={jandi.isActive} />
        ) : (
          <div key={nanoid()} />
        )
      )}
    </SC.JandiContainer>
  </SC.Wrapper>
);
export default ExerciseJandi;
