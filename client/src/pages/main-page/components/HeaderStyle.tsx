import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: -webkit-sticky; /* 사파리 브라우저 지원 */
  position: sticky;
  top: 0rem;
`;

export const Search = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 10px;

  background-color: #fff;
`;
