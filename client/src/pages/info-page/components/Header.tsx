import { Link, useLocation } from 'react-router-dom';
import getPath from 'common/utils/getPath';
import { useEffect, useState } from 'react';
import { customAxios } from 'common/api';
import * as SC from './HeaderStyle';
import ExerciseJandi from './ExerciseJandi';
import useJandi from '../hook/useJandi';
import DateInfo from './DateInfo';

const Header = () => {
  const DEFAULT_PATH = '/info';
  const path = getPath();
  const location = useLocation();
  const userId = location.pathname.split('/').at(-1);

  const [nickName, setNickName] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const { dateObject, jandiList, changeDate, resetDate } = useJandi();

  useEffect(() => {
    async function getRequest() {
      const response = await customAxios.get(`/api/user/info/${userId}`);
      setNickName(response.data.nickname);
      setProfileImg(response.data.profile_image);
    }

    getRequest();
  }, [userId]);

  const handleReset = () => {
    resetDate();
  };

  return (
    <SC.InfoHeader>
      <SC.ProfileImg src={profileImg} />
      <SC.InfoContainer>
        <SC.NameNavContainer>
          <SC.UserName>{nickName}</SC.UserName>
          <SC.Nav>
            <Link
              to={`${DEFAULT_PATH}/exercise/${userId}`}
              onClick={handleReset}
            >
              <SC.Li active={path === 'exercise'}>운동</SC.Li>
            </Link>
            <Link to={`${DEFAULT_PATH}/meal/${userId}`} onClick={handleReset}>
              <SC.Li active={path === 'meal'}>식단</SC.Li>
            </Link>
          </SC.Nav>
        </SC.NameNavContainer>
        <SC.JandiContainer>
          {path === 'exercise' && (
            <ExerciseJandi jandiList={jandiList}>
              <DateInfo dateObject={dateObject} changeDate={changeDate} />
            </ExerciseJandi>
          )}
          {path === 'meal' && (
            <>
              <h2>년월 설정</h2>
              <DateInfo
                dateObject={dateObject}
                changeDate={changeDate}
                fontSize={24}
              />
            </>
          )}
        </SC.JandiContainer>
      </SC.InfoContainer>
    </SC.InfoHeader>
  );
};

export default Header;
