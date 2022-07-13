import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type ValidationResponse = {
  message: string;
};

interface IFood {
  name: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  quantity: number;
  calories: number;
}

interface IResult {
  status: number;
  data: [IFood];
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
    getFood,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useFood;
