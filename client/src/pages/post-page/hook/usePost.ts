import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { useCallback, useState } from 'react';
import { RegisterInputType } from 'types/interfaces';

interface data {
  reason: string;
  result: string;
}

interface response {
  data: data;
}

interface ValidationResponse {
  message: string;
  response: response;
}

const useRegister = () => {
  const [error, setError] = useState<data>();
  const [isLoading, setLoading] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const registerRequest = useCallback((formData: RegisterInputType) => {
    setLoading(true);
    customAxios
      .post(`/api/user/register`, formData, { withCredentials: true })
      .then((res) => {
        console.log('then', res.data);
        setError(undefined);
        setShowError(false);
        setIsSuccess(true);
        window.location.href = '/login';
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as ValidationResponse;
          if (responseError && responseError.response) {
            console.log(responseError.response.data);
            setError({
              reason: responseError.response.data.reason,
              result: responseError.response.data.result,
            });
            setShowError(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    isLoading,
    isSend,
    registerRequest,
    error,
    isSuccess,
    isShowError,
    setShowError,
  };
};

export default useRegister;
