/* eslint-disable no-param-reassign */
import axios from 'axios';

export const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

/*
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/

customAxios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

customAxios.defaults.timeout = 5000;

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('userId');
      alert('접근 권한이 없습니다. 로그인 화면으로 이동합니다.');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
