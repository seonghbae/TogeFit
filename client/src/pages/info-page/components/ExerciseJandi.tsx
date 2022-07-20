/* eslint-disable no-nested-ternary */
import getPadString from 'common/utils/getPadString';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from 'styled-icons/material-outlined';
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
export default ExerciseJandi;
