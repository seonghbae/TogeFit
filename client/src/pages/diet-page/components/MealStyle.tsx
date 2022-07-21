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
    font-size: 1.1rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin-right: 1rem;
  width: 100%;
  border-radius: 0.5rem;
`;

export const MealList = styled.ol`
  margin: 0;
  flex-grow: 3;
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
