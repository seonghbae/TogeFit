import { Link } from 'react-router-dom';
import getPath from 'common/utils/getPath';
import * as SC from './HeaderStyle';
import ExerciseJandi from './ExerciseJandi';

const Header = () => {
  const DEFAULT_PATH = '/info';
  const path = getPath();

  return (
    <SC.InfoHeader>
      <SC.ProfileImg src="/images/user.png" />
      <SC.InfoContainer>
        <SC.NameNavContainer>
          <SC.UserName>나는능이버섯이야</SC.UserName>
          <SC.Nav>
            <Link to={`${DEFAULT_PATH}/exercise`}>
              <SC.Li active={path === 'exercise'}>운동</SC.Li>
            </Link>
            <Link to={`${DEFAULT_PATH}/meal`}>
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
