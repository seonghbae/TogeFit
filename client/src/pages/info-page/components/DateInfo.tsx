import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from 'styled-icons/material-outlined';
import { useState, useRef, MutableRefObject } from 'react';

import { DateObject } from 'recoil/infoState';
import getPadString from 'common/utils/getPadString';
import { AlertModal } from 'common/components';
import { actionType } from '../hook/useJandi';
import * as SC from './DateInfoStyle';

interface DateProps {
  dateObject: DateObject;
  fontSize?: number;
  changeDate: (type: actionType, goTo?: DateObject | undefined) => void;
}

const DateInfo = ({ dateObject, fontSize, changeDate }: DateProps) => {
  const [isOpen, setOpen] = useState(false);
  const yearRef = useRef() as MutableRefObject<HTMLInputElement>;
  const monthRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    changeDate('jump', {
      year: parseInt(yearRef.current.value, 10),
      month: parseInt(monthRef.current.value, 10) - 1,
    });
    handleCancel();
  };

  return (
    <>
      <SC.Title fontSize={fontSize}>
        <KeyboardArrowLeft
          onClick={() => {
            changeDate('left');
          }}
        />
        <button type="button" onClick={handleOpen}>
          {`${dateObject.year}.${getPadString(dateObject.month + 1, 2)}`}
        </button>
        <KeyboardArrowRight
          onClick={() => {
            changeDate('right');
          }}
        />
      </SC.Title>
      {isOpen && (
        <AlertModal
          message="이동할 년월을 입력하세요."
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        >
          <SC.InputContainer>
            <SC.DateInput
              type="number"
              defaultValue={dateObject.year}
              ref={yearRef}
              placeholder="년도"
              min="1970"
              max="2050"
            />
            <SC.DateInput
              type="number"
              defaultValue={dateObject.month + 1}
              ref={monthRef}
              placeholder="월"
              min="1"
              max="12"
            />
          </SC.InputContainer>
        </AlertModal>
      )}
    </>
  );
};

export default DateInfo;
