import { Link, useLocation } from 'react-router-dom';
import getPath from 'common/utils/getPath';
import { useEffect, useState } from 'react';
import { customAxios } from 'common/api';
import * as SC from './HeaderStyle';
import ExerciseJandi from './ExerciseJandi';

const Header = () => {
  const DEFAULT_PATH = '/info';
  const path = getPath();
  const location = useLocation();
  const userId = location.pathname.split('/').at(-1);

  const [nickName, setNickName] = useState('');
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    async function getRequest() {
      const response = await customAxios.get(`/api/user/info/${userId}`);
      setNickName(response.data.nickname);
      setProfileImg(response.data.profile_image);
    }

    getRequest();
  }, [userId]);

  return (
    <SC.InfoHeader>
      <SC.ProfileDiv>
        <SC.ProfileImg src={profileImg} />
      </SC.ProfileDiv>
      <SC.InfoContainer>
        <SC.NameNavContainer>
          <SC.UserName>{nickName}</SC.UserName>
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
