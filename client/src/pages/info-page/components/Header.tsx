import { Link } from 'react-router-dom';
import getPath from 'common/utils/getPath';
import * as S from './HeaderStyle';
import ExerciseJandi from './ExerciseJandi';

const Header = () => {
  const DEFAULT_PATH = '/info';
  const path = getPath();

  return (
    <S.InfoHeader>
      <S.ProfileImg src="/images/user.png" />
      <S.InfoContainer>
        <S.NameNavContainer>
          <S.UserName>나는능이버섯이야</S.UserName>
          <S.Nav>
            <Link to={`${DEFAULT_PATH}/exercise`}>
              <S.Li active={path === 'exercise'}>운동</S.Li>
            </Link>
            <Link to={`${DEFAULT_PATH}/meal`}>
              <S.Li active={path === 'meal'}>식단</S.Li>
            </Link>
          </S.Nav>
        </S.NameNavContainer>
        <S.JandiContainer>
          {path === 'exercise' && <ExerciseJandi />}
        </S.JandiContainer>
      </S.InfoContainer>
    </S.InfoHeader>
  );
};

export default Header;
