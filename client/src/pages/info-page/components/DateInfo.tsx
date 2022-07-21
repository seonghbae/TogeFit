import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from 'styled-icons/material-outlined';
import { DateObject } from 'recoil/infoState';
import getPadString from 'common/utils/getPadString';
import * as SC from './DateInfoStyle';

interface DateProps {
  dateObject: DateObject;
  fontSize?: number;
  changeDate: (type: string) => void;
}

const DateInfo = ({ dateObject, fontSize, changeDate }: DateProps) => (
  <SC.Title fontSize={fontSize}>
    <KeyboardArrowLeft
      onClick={() => {
        changeDate('left');
      }}
    />
    {`${dateObject.year}.${getPadString(dateObject.month + 1, 2)}`}
    <KeyboardArrowRight
      onClick={() => {
        changeDate('right');
      }}
    />
  </SC.Title>
);

export default DateInfo;
