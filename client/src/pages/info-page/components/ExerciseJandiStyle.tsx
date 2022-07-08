import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr 1fr repeat(6, 1fr);
  place-items: center center;
  /* grid-gap: 2px; */
`;

export const DaySpan = styled.span<{ sat?: boolean }>`
  grid-row-start: 2;
  color: red;

  ${(props) =>
    props.sat &&
    css`
      grid-row-start: 2;
      grid-column-start: 7;
      color: blue;
    `}
`;

export const Title = styled.h3`
  grid-column-start: 1;
  grid-column-end: 8;
  margin: 0;
`;

export const JandiContainer = styled.div`
  grid-row-start: 3;
  grid-row-end: 9;
  grid-column-start: 1;
  grid-column-end: 8;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 100%;
  place-items: center center;
  grid-row-gap: 10px;
`;

export const JandiItem = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 10px;

  &.active {
    background-color: ${(props) => props.theme.pointColors.green};
  }
`;
