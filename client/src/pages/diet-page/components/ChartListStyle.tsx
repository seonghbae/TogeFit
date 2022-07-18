import styled from 'styled-components';

export const ChartListContainer = styled.div`
  border: 1px solid ${(props) => props.theme.pointColors.black};
  margin: 0 5% 5% 5%;
  height: 80%;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5%;
  position: relative;
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
