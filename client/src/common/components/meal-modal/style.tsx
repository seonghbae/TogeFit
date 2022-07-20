import styled from 'styled-components';
import { Close } from 'styled-icons/material-rounded';

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9998;
`;

export const Modal = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  max-width: 850px;
  padding: 4rem 2rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 9999;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    height: auto;
    padding: 3rem 1rem;
  }
`;

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 3%;
  right: 3%;
  padding: 0;
  width: 1.8rem;
  cursor: pointer;
`;

export const MealContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  & + & {
    margin-top: 2rem;
  }

  > div {
    display: flex;
  }
`;

export const MealName = styled.h1`
  margin: 0;
  padding: 0 3px 5px 3px;
  border-bottom: 3px solid ${(props) => props.theme.pointColors.orange};
`;

export const FoodContainer = styled.div`
  margin-left: 20px;
`;

export const FoodName = styled.h3`
  margin: 0;
`;

export const FoodQuantity = styled.p`
  margin: 0;
`;
