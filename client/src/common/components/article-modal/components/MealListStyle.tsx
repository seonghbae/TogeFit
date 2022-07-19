import styled from 'styled-components';

export const Wrapper = styled.div``;

export const MealContainer = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    padding-top: 10px;
  }

  + div {
    margin-top: 10px;
  }
`;

export const FoodContainer = styled.div`
  + div {
    margin-left: 10px;
  }
`;

export const MealName = styled.h3``;

export const FoodName = styled.h4`
  margin: 0;
`;

export const FoodQuantity = styled.p`
  margin: 0;
`;
