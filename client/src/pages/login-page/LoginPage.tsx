import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { customAxios } from 'common/api';

import LoginForm from './components/LoginForm';

import * as SC from './LoginPageStyle';

const LoginPage: React.FC = () => (
  <SC.Wrapper>
    <div>
      <LoginForm />
      <p>
        <span>혹시 회원이 아니신가요?</span>
        <SC.RegisterLink to="/register">회원가입</SC.RegisterLink>
      </p>
    </div>
  </SC.Wrapper>
);

export default LoginPage;
