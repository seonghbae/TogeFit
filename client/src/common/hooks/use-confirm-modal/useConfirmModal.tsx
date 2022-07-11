/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as SC from './style';
// isCancel, setIsCancel, open, setOpen, renderConfirmModal
type useConfrimModalResult = {
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderConfirmModal: () => JSX.Element;
};
const useConfirmModal = ({
  childComponent,
  handleConfirmFunc,
}: {
  childComponent: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleConfirmFunc: Function;
}): useConfrimModalResult => {
  const [isCancel, setIsCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    setIsCancel(true);
  };

  const handleDivClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleConfirm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen(false);
    handleConfirmFunc();
  };

  const renderConfirmModal = () => (
    <SC.Wrapper view={open} onClick={handleCancel}>
      <div onClick={handleDivClick}>
        {childComponent()}
        <div>
          <input type="submit" value="확인" onClick={handleConfirm} />
          <input type="button" value="취소" onClick={handleCancel} />
        </div>
      </div>
    </SC.Wrapper>
  );

  return { isCancel, setIsCancel, open, setOpen, renderConfirmModal };
};

export default useConfirmModal;
