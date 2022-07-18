import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { IMealList } from 'types/interfaces';

type ValidationResponse = {
  message: string;
};

interface IResult {
  status: number;
  data: IMealList[];
}

const useMealAdd = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const addMeal = useCallback((data: object) => {
    setLoading(true);
    customAxios
      .post(`/api/meal/register`, data)
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as AxiosError<ValidationResponse>;
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
    addMeal,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useMealAdd;
