import styled from 'styled-components';

const DietContainer = styled.div`
  border: 1px solid ${(props) => props.theme.pointColors.black};
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  height: 100vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default DietContainer;
