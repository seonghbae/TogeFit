import { useRef, MutableRefObject } from 'react';
import * as SC from './style';

interface ModalProps {
  children?: React.ReactNode;
  message: string;
  handleConfirm: () => void;
  handleCancel?: () => void;
}

const Modal = ({
  children,
  message,
  handleConfirm,
  handleCancel,
}: ModalProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <SC.Wrapper
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === ref.current) {
          handleConfirm();
        }
      }}
      ref={ref}
    >
      <SC.Modal>
        <SC.ModalMessage>{message}</SC.ModalMessage>
        {children}
        <SC.ButtonContainer>
          <SC.Button onClick={handleConfirm}>확인</SC.Button>
          {handleCancel && <SC.Button onClick={handleCancel}>취소</SC.Button>}
        </SC.ButtonContainer>
      </SC.Modal>
    </SC.Wrapper>
  );
};

export default Modal;
