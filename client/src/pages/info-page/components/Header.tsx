import { Link, useParams } from 'react-router-dom';
import * as S from './HeaderStyle';

const Header: React.FC = () => {
  const DEFAULT_PATH = '/info';
  const { type } = useParams();

  return (
    <S.InfoHeader>
      <S.ProfileImg src="/images/user.png" />
      <S.InfoContainer>
        <S.NameNavContainer>
          <S.UserName>나는능이버섯이야</S.UserName>
          <S.Nav>
            <Link to={`${DEFAULT_PATH}/exercise`}>
              <S.Li active={type === 'exercise'}>운동</S.Li>
            </Link>
            <Link to={`${DEFAULT_PATH}/meal`}>
              <S.Li active={type === 'meal'}>식단</S.Li>
            </Link>
          </S.Nav>
        </S.NameNavContainer>
        <S.JandiContainer>
          운동 잔디가 들어갈 공간 (경로에 따라 변경 예정)
        </S.JandiContainer>
      </S.InfoContainer>
    </S.InfoHeader>
  );
};

export default Header;
