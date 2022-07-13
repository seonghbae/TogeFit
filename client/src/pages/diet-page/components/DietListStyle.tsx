import styled from 'styled-components';

export const DietListContainer = styled.div`
  border: 1px solid ${(props) => props.theme.pointColors.black};
  background-color: #fff;
  margin: 0 5%;
  height: 100vh;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 3%;
  & > button {
    margin-right: 1rem;
    border: 1px solid;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
  }
`;
