import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  button {
    margin-right: 3rem;

    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    width: 3rem;
    height: 3rem;
    color: #000000b2;
    border-radius: 3rem;
    transition: all 300ms;

    :hover {
      background-color: ${(props) => props.theme.pointColors.orange};
      border-radius: 1rem;
      color: #fff;
    }
  }
`;

export const Search = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 10px;
  margin-left: 1rem;
  background-color: #fff;
`;
