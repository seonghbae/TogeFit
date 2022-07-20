import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { useCallback, useState } from 'react';
import { IUserInfoModify, RegisterInputType } from 'types/interfaces';

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

const useModify = () => {
  const [error, setError] = useState<data>();
  const [isLoading, setLoading] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modifyRequest = useCallback((formData: IUserInfoModify) => {
    setLoading(true);
    customAxios
      .patch(`/api/user`, formData)
      .then((res) => {
        setError(undefined);
        setShowError(false);
        setIsSuccess(true);
        alert('성공적으로 수정되었습니다.');
        window.location.href = '/';
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
    modifyRequest,
    error,
    isSuccess,
    isShowError,
    setShowError,
  };
};

export default useModify;
