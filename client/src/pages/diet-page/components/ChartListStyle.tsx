import styled from 'styled-components';

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5%;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  row-gap: 1rem;

  & > button {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
  }
`;
