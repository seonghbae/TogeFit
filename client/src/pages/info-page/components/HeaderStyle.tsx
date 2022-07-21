import styled, { css } from 'styled-components';

interface LiProps {
  active: boolean;
}

export const InfoHeader = styled.header`
  position: relative;
  width: 70%;
  height: 30rem;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 4rem;
  background-color: #fff;
`;

export const ProfileDiv = styled.div`
  position: absolute;
  width: 10rem;
  height: 10rem;
  min-width: 150px;
  margin: 10px;
  top: 0%;
  left: 6%;
  overflow: hidden;
  background-color: ${(props) => props.theme.pointColors.beige};
  border: 1rem solid ${(props) => props.theme.pointColors.beige};
  border-radius: 100%;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 60%;
  height: 100%;
  margin: 0 5rem 0 auto;
  justify-content: center;
  flex-direction: column;
`;

export const NameNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const UserName = styled.span`
  font-size: 2rem;
`;

export const Nav = styled.nav`
  a + a {
    margin-left: 1.5rem;
  }

  span {
    padding: 0 1.8rem;
    font-size: 1.6rem;
  }
`;

export const Li = styled.li<LiProps>`
  display: inline-block;
  font-size: 1.8rem;
  padding: 0 0.3rem;
  padding-bottom: 0.4rem;
  border-bottom: 5px solid #fff;

  ${(props) =>
    props.active &&
    css`
      border-bottom: 5px solid ${props.theme.pointColors.orange};
    `}
`;

export const JandiContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
