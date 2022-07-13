import { useRef, MutableRefObject, useEffect } from 'react';
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

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e.currentTarget);
    console.log(e.currentTarget.querySelectorAll('input'));
    // const target = e.target as typeof e.target & {
    //   set: { value: string };
    //   count: { value: string };
    //   weight: { value: string };
    // };
    // const set = target.set.value; // typechecks!
    // const count = target.count.value; // typechecks!

    handleConfirm();
  };

  return (
    <SC.Wrapper
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === ref.current) {
          if (handleCancel) handleCancel();
          else handleConfirm();
        }
      }}
      ref={ref}
    >
      <SC.Modal>
        <SC.ModalMessage>{message}</SC.ModalMessage>
        <form onSubmit={handleSubmit}>
          {children}
          <SC.ButtonContainer>
            <SC.Button>확인</SC.Button>
            {handleCancel && <SC.Button onClick={handleCancel}>취소</SC.Button>}
          </SC.ButtonContainer>
        </form>
      </SC.Modal>
    </SC.Wrapper>
  );
};

export default Modal;
