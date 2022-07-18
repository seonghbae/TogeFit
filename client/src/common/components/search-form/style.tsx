import styled from 'styled-components';

export const StyledForm = styled.form`
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

    border: solid 1px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    padding-left: 2rem;
    padding-right: 5rem;
  }
  & > input[type='submit'] {
    position: absolute;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 0px 15px 15px 0px;
    font-size: 1rem;
    width: 4rem;
    margin-right: 0%;
    height: 2rem;
    cursor: pointer;
    transition: 200ms all;
    :hover {
      background-color: ${(props) => props.theme.pointColors.orange};
      opacity: 80%;
      color: #fff;
    }
  }
`;
