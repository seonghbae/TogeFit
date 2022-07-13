import { Link, useLocation } from 'react-router-dom';
import getPath from 'common/utils/getPath';
import * as SC from './HeaderStyle';
import ExerciseJandi from './ExerciseJandi';

const Header = () => {
  const DEFAULT_PATH = '/info';
  const path = getPath();
  const location = useLocation();
  const userId = location.pathname.split('/').at(-1);

  return (
    <SC.InfoHeader>
      <SC.ProfileImg src="/images/user.png" />
      <SC.InfoContainer>
        <SC.NameNavContainer>
          <SC.UserName>나는능이버섯이야</SC.UserName>
          <SC.Nav>
            <Link to={`${DEFAULT_PATH}/exercise/${userId}`}>
              <SC.Li active={path === 'exercise'}>운동</SC.Li>
            </Link>
            <Link to={`${DEFAULT_PATH}/meal/${userId}`}>
              <SC.Li active={path === 'meal'}>식단</SC.Li>
            </Link>
          </SC.Nav>
        </SC.NameNavContainer>
        <SC.JandiContainer>
          {path === 'exercise' && <ExerciseJandi />}
        </SC.JandiContainer>
      </SC.InfoContainer>
    </SC.InfoHeader>
  );
};

export default Header;
