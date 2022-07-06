import styled from 'styled-components';

const StyledForm = styled.form`
  font-size: 2rem;
  border: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  outline: none;
  position: relative;
  margin: 5%;
  flex: 1;
  & > input[type='text'] {
    justify-self: flex-start;
    position: absolute;
    width: 100%;
    height: 2rem;
    border-radius: 15px;
    border: 1px solid;
    background-color: #fff;
    padding-left: 2rem;
    padding-right: 5rem;
  }
  & > input[type='submit'] {
    position: absolute;
    border: solid 1px #000;
    border-radius: 0px 15px 15px 0px;
    width: 4rem;
    margin-right: 0%;
    height: 2rem;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.pointColors.green};
      opacity: 80%;
      color: #fff;
    }
  }
`;

export default StyledForm;
