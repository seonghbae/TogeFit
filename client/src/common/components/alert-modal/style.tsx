import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  height: 350px;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: 20px;
`;

export const ModalMessage = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;

export const ButtonContainer = styled.div``;

export const Button = styled.button`
  font-size: 1.2rem;
`;
