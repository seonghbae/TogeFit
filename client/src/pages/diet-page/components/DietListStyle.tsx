import styled from 'styled-components';

export const DietListContainer = styled.div`
  /* background-color: #fff; */
  margin: 0 5% 5% 5%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0% 5% 2% 5%;

  > button {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

    padding: 5px 10px;
    font-size: 1.2rem;
    border-radius: 1rem;
    background-color: #fff;
    transition: 200ms all cubic-bezier(0.075, 0.82, 0.165, 1);
    :hover {
      background-color: ${(props) => props.theme.pointColors.orange};
    }
  }
  > div {
    font-size: 2.5rem;
  }
`;

export const ChartListContainer = styled.div`
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin: 0 5% 5% 5%;
  height: 80%;
  border-radius: 0.5rem;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
