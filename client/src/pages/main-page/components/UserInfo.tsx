import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from 'common/api';
import { getUserId } from 'common/utils/getUserId';
import { Dumbbell } from 'styled-icons/fa-solid';
import { SpoonKnife } from 'styled-icons/icomoon';
import { Article } from 'styled-icons/material-rounded';
import { Logout, Login } from 'styled-icons/material-twotone';
import { AlertModal } from 'common/components';
import useLogoutRequest from 'common/components/nav/hook/useLogoutRequest';
import * as SC from './UserInfoStyle';

const UserInfo = () => {
  const userId = getUserId();
  const [nickName, setNickName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const { requestLogout, responseMsg, setModalOpen, isModalOpen } =
    useLogoutRequest();

  const handleConfirm = () => {
    setModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    async function getRequest() {
      const response = await customAxios.get(`/api/user/info/${userId}`);
      setNickName(response.data.nickname);
      setProfileImg(response.data.profile_image);
    }
    getRequest();
  }, [userId]);

  return (
    <>
      <SC.UserInfo>
        {userId ? (
          <>
            <SC.PrifileImgDiv>
              <SC.ProfileImg src={profileImg} />
            </SC.PrifileImgDiv>
            <SC.UserProfile>
              <SC.UserName>
                {nickName}님 <br />
                안녕하세요!
              </SC.UserName>
            </SC.UserProfile>
            <Link to="/modify">
              <SC.PageLink>
                <Article />내 정보
              </SC.PageLink>
            </Link>
            <Link to={`/info/exercise/${userId}`}>
              <SC.PageLink>
                <Article />내 게시글
              </SC.PageLink>
            </Link>
            <Link to="/routine">
              <SC.PageLink>
                <Dumbbell />
                개인 루틴
              </SC.PageLink>
            </Link>
            <Link to="/diet">
              <SC.PageLink>
                <SpoonKnife />
                식단
              </SC.PageLink>
            </Link>
          </>
        ) : (
          <SC.UserProfile>
            <SC.UserIcon />
            <SC.UserName>GUEST</SC.UserName>
          </SC.UserProfile>
        )}

        {userId ? (
          <button type="button" onClick={requestLogout}>
            <SC.PageLink>
              <Logout />
              로그아웃
            </SC.PageLink>
          </button>
        ) : (
          <Link to="/login">
            <SC.PageLink>
              <Login />
              로그인
            </SC.PageLink>
          </Link>
        )}
      </SC.UserInfo>
      {isModalOpen && (
        <AlertModal message={responseMsg} handleConfirm={handleConfirm} />
      )}
    </>
  );
};

export default UserInfo;
