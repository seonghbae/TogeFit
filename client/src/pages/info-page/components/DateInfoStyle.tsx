import styled, { css } from 'styled-components';

export const Title = styled.h3<{ fontSize?: number }>`
  display: flex;
  grid-column-start: 1;
  grid-column-end: 8;
  margin: 0;
  align-items: center;
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `}

  > svg {
    width: 50px;
    cursor: pointer;
    vertical-align: middle;
  }
`;
