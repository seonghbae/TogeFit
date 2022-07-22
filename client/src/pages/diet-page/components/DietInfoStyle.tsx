import styled from 'styled-components';

export const DietInfoContainer = styled.div`
  margin: 0 5%;
  height: 100vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3%;
  padding: 3% 0;
  > button {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    margin-right: 1rem;
    padding: 5px 10px;
    font-size: 1.2rem;
    border-radius: 1rem;
    background-color: #fff;
  }
  > div {
    font-size: 2.5rem;
  }
`;
