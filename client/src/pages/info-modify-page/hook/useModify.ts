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
  const [message, setMessage] = useState<data>();
  const [isLoading, setLoading] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  const modifyRequest = useCallback((formData: FormData) => {
    setLoading(true);
    customAxios
      .patch(`/api/user`, formData)
      .then((res) => {
        setError(undefined);
        if (res.data) {
          setMessage({
            reason: '성공적으로 수정되었습니다.',
            result: '',
          });
        }
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as ValidationResponse;
          if (responseError && responseError.response) {
            console.log(responseError.response.data);
            setMessage({
              reason: responseError.response.data.reason,
              result: responseError.response.data.result,
            });
          }
        }
      })
      .finally(() => {
        setShowError(true);
        setLoading(false);
      });
  }, []);

  const withdrawalRequest = async (
    password: string,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    try {
      const result = await customAxios.post('/api/user/unregister', {
        password,
      });
      setMessage({
        reason: result.data.message,
        result: 'success',
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseError = err as ValidationResponse;
        if (responseError && responseError.response) {
          setMessage({
            reason: responseError.response.data.reason,
            result: responseError.response.data.result,
          });
        }
      }
    }
    setLoading(false);
    setShowError(true);
    setModalOpen(false);
  };

  return {
    isLoading,
    isSend,
    modifyRequest,
    error,
    isShowError,
    message,
    setMessage,
    setShowError,
    withdrawalRequest,
  };
};

export default useModify;
