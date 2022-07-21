/* eslint-disable no-nested-ternary */
import { Dumbbell as NoDumbbell } from 'styled-icons/fluentui-system-regular';
import { Dumbbell as YesDumbbell } from 'styled-icons/fluentui-system-filled';
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
          jandi.isActive ? (
            <YesDumbbell size="30px" color="green" />
          ) : (
            <NoDumbbell size="30px" color="" />
          )
        ) : (
          <div key={nanoid()} />
        )
      )}
    </SC.JandiContainer>
  </SC.Wrapper>
);
export default ExerciseJandi;
