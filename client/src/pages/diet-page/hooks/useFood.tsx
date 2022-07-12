import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type EmailValidationResponse = {
  message: string;
};

interface IData {
  name: string;
  _id: string;
}

interface IResult {
  status: number;
  data: [IData];
}

const useFood = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const getFood = useCallback(() => {
    setLoading(true);
    customAxios
      .get(`/api/food`)
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<EmailValidationResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    getFood,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useFood;
