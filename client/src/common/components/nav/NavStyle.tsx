import styled, { css } from 'styled-components';
import { Navicon } from 'styled-icons/evil';
import { UserCircle } from 'styled-icons/boxicons-solid';

export const NavWrapper = styled.nav`
  display: flex;
  position: relative;
  width: 100%;
  height: 100px;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin-bottom: 5%;
`;

export const NavBurger = styled(Navicon)<{ openSidebar: boolean }>`
  width: 65px;
  height: 65px;
  color: ${(props) => props.theme.pointColors.orange};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  ${(props) =>
    props.openSidebar &&
    css`
      transform: rotate(90deg);
    `}
`;

export const Title = styled.h1`
  font-size: 2.2rem;
`;

export const UserIcon = styled(UserCircle)`
  width: 60px;
  height: 60px;
  color: ${(props) => props.theme.pointColors.orange};
`;

export const LoginButton = styled.button`
  padding: 8px 20px;
  border: 1px solid ${(props) => props.theme.pointColors.orange};
  border-radius: 2rem;
  font-size: 1.2rem;
`;
