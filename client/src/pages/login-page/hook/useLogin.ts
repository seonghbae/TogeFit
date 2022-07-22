import axios, { AxiosError } from 'axios';
import { FormInputType } from 'types/interfaces';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { customAxios } from 'common/api';

interface LoginResponse {
  reason: string;
  userId: string;
}

const useLogin = () => {
  const [error, setError] = useState<Error['message']>('');
  const [result, setResult] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const asyncLogin = useCallback((data: FormInputType) => {
    setLoading(true);

    customAxios
      .post<LoginResponse>(`/api/user/login`, data, { withCredentials: true })
      .then((response) => {
        setResult('OK');
        setError('');
        setIsError(false);
        localStorage.setItem('userId', response.data.userId);
        navigate(`/`);
      })
      .catch((err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<LoginResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.reason);
            setIsError(true);
            setResult('');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { asyncLogin, error, result, isLoading, isError, setIsError };
};

export default useLogin;
