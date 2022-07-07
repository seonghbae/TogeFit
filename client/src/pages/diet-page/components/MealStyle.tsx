import styled from 'styled-components';

export const MealContainer = styled.div`
  border: 1px solid ${(props) => props.theme.pointColors.black};
  display: flex;
  flex-direction: column;

  margin-left: 5%;
  margin-right: 5%;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MealList = styled.ol`
  margin: 0;
  padding: 0;
  flex-grow: 3;
`;
