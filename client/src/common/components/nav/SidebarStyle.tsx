import styled, { css, keyframes } from 'styled-components';

const wipeIn = keyframes`
  to {
    transform: translateX(200px);
  }
  `;

const wipeOut = keyframes`
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0px);
  }
`;

export const Wrapper = styled.div<{ openSidebar: boolean }>`
  display: flex;
  position: absolute;
  top: 100px;
  left: -200px;
  width: 10%;
  min-width: 200px;
  min-height: ${document.documentElement.scrollHeight}px;
  background-color: ${(props) => props.theme.pointColors.green};
  padding-top: 5rem;
  align-items: center;
  flex-direction: column;
  border-right: 1.3px solid rgba(0, 0, 0, 0.2);
  color: #fff;
  z-index: 10;
  ${(props) =>
    props.openSidebar
      ? css`
          animation: 0.5s cubic-bezier(0.25, 1, 0.3, 1) ${wipeIn} both;
        `
      : css`
          animation: 0.5s cubic-bezier(0.25, 1, 0.3, 1) ${wipeOut} both;
        `}
`;

export const NavLink = styled.li`
  margin-bottom: 2rem;
  border-bottom: 3px solid ${(props) => props.theme.pointColors.green};

  > a {
    font-size: 1.5rem;
    padding-bottom: 10px;

    :hover {
      border-bottom: 3px solid #fff;
    }

    > svg {
      width: 40px;
      height: 40px;
      padding-right: 10px;
    }
  }
`;
