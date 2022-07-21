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

  > button {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
`;

export const DateInput = styled.input`
  width: 80px;
  font-size: 1.1rem;
  text-align: center;
  border-bottom: 3px solid gray;
  padding: 5px 10px;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & + & {
    margin-left: 20px;
  }

  :focus {
    border-bottom: 3px solid ${(props) => props.theme.pointColors.orange};
  }
`;
