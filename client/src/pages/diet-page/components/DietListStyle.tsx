import styled from 'styled-components';

export const DietListContainer = styled.div`
  background-color: #fff;
  margin: 0 5% 5% 5%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3%;
  padding: 3% 0;
  > button {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    border-radius: 1rem;
  }
  > div {
    font-size: 2.5rem;
  }
`;

export const ChartListContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin: 0 5% 5% 5%;
  height: 80%;
  border-radius: 0.5rem;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
