import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customAxios } from 'common/api';

interface LogoutResponse {
  reason: string;
  result: string;
}

const useLogoutRequest = () => {
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const requestLogout = () => {
    setLoading(true);
    customAxios
      .get<LogoutResponse>('/api/user/logout', { withCredentials: true })
      .then((response) => {
        setResponseMsg(response.data.result);
        setModalOpen(true);
        localStorage.removeItem('userId');
        navigate(`/`);
      })
      .catch((err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<LogoutResponse>;
          if (responseError && responseError.response) {
            setResponseMsg(responseError.response.data.reason);
            setModalOpen(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    requestLogout,
    responseMsg,
    isLoading,
    setModalOpen,
    isModalOpen,
  };
};

export default useLogoutRequest;
