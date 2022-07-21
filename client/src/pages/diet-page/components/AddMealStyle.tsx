import styled from 'styled-components';

export const AddMealContainer = styled.div`
  background-color: #fff;
  margin: 0 5%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: right;
  margin: 3%;
  padding: 3# 0;
  align-items: center;
  > button {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    border-radius: 1rem;
  }
  > div {
    font-size: 1.5rem;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5rem;
  > div {
    border-radius: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem;
  > button {
    font-size: 1.2rem;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    margin-right: 1rem;
    border-radius: 1rem;
    padding: 0.5rem;
  }
`;
