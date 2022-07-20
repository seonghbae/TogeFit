import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9998;
`;

export const Modal = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  max-width: 1200px;
  padding: 4rem 2rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 9999;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 3rem 1rem;
  }
`;
