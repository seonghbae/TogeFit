import axios, { AxiosError } from 'axios';
import { FormInputType } from 'types/interfaces';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { customAxios } from 'common/api';

type LoginResponse = {
  message: string;
  userId: string;
};

const useLogin = () => {
  const [error, setError] = useState<Error['message']>('');
  const [result, setResult] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const asyncLogin = useCallback((data: FormInputType) => {
    setLoading(true);

    customAxios
      .post<LoginResponse>(`/api/user/login`, data, { withCredentials: true })
      .then((response) => {
        setResult('OK');
        setError('');
        setShowError(false);
        document.cookie = `userId=${response.data}`;
        navigate(`/`);
      })
      .catch((err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<LoginResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
            setResult('');
          }
        }
      })
      .finally(() => {
        console.log('finally');
        setLoading(false);
      });
  }, []);

  return { asyncLogin, error, result, isLoading, showError };
};

export default useLogin;
