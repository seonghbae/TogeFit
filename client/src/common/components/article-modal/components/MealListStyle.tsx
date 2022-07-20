import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  /* overflow: scroll;
  overflow: auto;
  white-space: nowrap; */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const MealContainer = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    padding-top: 10px;
  }

  & + & {
    margin-top: 0px;
    margin-left: 1rem;
  }
`;
export const FoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FoodContainer = styled.div`
  + div {
    margin-top: 1rem;
  }
`;

export const MealName = styled.h3`
  margin: 0;
`;

export const FoodName = styled.h4`
  margin: 0;
`;

export const FoodQuantity = styled.p`
  margin: 0;
`;
