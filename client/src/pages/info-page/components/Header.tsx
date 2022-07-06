import * as S from './HeaderStyle';

const Header: React.FC = () => (
  <S.InfoHeader>
    <S.ProfileImg src="/images/user.png" />
    <S.InfoContainer>
      <S.NameNavContainer>
        <S.UserName>나는능이버섯이야</S.UserName>
        <S.Nav>
          <li>운동</li>
          <li>식단</li>
        </S.Nav>
      </S.NameNavContainer>
      <S.JandiContainer>
        운동 잔디가 들어갈 공간 (border는 공간을 표시하기위해 임시로 넣어둔
        것입니다.)
      </S.JandiContainer>
    </S.InfoContainer>
  </S.InfoHeader>
);

export default Header;
