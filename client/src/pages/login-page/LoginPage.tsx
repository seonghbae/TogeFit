import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { customAxios } from 'common/api';

import LoginForm from './components/LoginForm';

import { Wrapper, RegisterLink } from './LoginPageStyle';

const LoginPage: React.FC = () => {
  console.log('login');
  return (
    <Wrapper>
      <div>
        <LoginForm />
        <p>
          <span>혹시 회원이 아니신가요?</span>
          <RegisterLink to="/register">회원가입</RegisterLink>
        </p>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
