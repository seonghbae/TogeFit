import styled from 'styled-components';
import { UserCircle } from 'styled-icons/boxicons-solid';

export const UserInfo = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 20rem;
  height: 35%;
  margin: 10rem 0;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 1rem;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
`;

export const ProfileImg = styled.img`
  width: 50%;
  min-width: 80px;
  height: auto;
  background-color: ${(props) => props.theme.pointColors.beige};
  border: 0.5rem solid ${(props) => props.theme.pointColors.beige};
  border-radius: 100%;
`;

export const UserIcon = styled(UserCircle)`
  width: 50%;
  height: 70%;
  color: ${(props) => props.theme.pointColors.orange};
`;

export const UserName = styled.span`
  font-size: 1.5rem;
`;

export const PageLink = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;

  :hover {
    border-bottom: 3px solid ${(props) => props.theme.pointColors.orange};
  }

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    padding-right: 10px;
  }
`;

export const LoginWrapper = styled.div`
  position: fixed;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 15%;
  height: 10%;
`;

export const LoginButton = styled.button`
  padding: 8px 20px;
  border: 1px solid ${(props) => props.theme.pointColors.orange};
  border-radius: 2rem;
  font-size: 1.2rem;
`;
