import styled, { keyframes, DefaultTheme } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const upside = keyframes`
  0%,
  100% {
    transform: translateY(0px) ;
  }
  50% {
    transform: translateY(-15px) ;
  }
`;

export const LoadingBar = styled.div`
  position: absolute;
  left: 50%;
  right: 0;
  top: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  width: auto;
  height: 50px;
  display: flex;
  justify-content: center;

  & > div:not(:first-child) {
    margin-left: 20px;
  }

  & > div:nth-child(1) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 100ms;
  }

  & > div:nth-child(2) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 250ms;
  }

  & > div:nth-child(3) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 400ms;
  }
`;

export const Dot = styled.div<{ bgColor?: string; dotSize?: string }>`
  width: ${(props) => props.dotSize};
  height: ${(props) => props.dotSize};
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
`;
