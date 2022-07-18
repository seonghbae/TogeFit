import styled from 'styled-components';

export const MealContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5%;
  position: relative;

  & > span {
    position: absolute;
    left: 5%;
    top: 2%;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  width: 100%;
`;

export const MealList = styled.ol`
  margin: 0;
  flex-grow: 3;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;

  & > button {
    border: 1px solid;
    width: 3rem;
    height: 3rem;
  }
`;
