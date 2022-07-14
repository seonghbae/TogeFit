import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { IFoodList } from 'types/interfaces';

type ValidationResponse = {
  message: string;
};

const useFood = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [food, setFood] = useState<IFoodList>();

  const getFood = useCallback(() => {
    setLoading(true);
    customAxios
      .get(`/api/food`)
      .then((response) => {
        setFood({ status: response.status, data: response.data });
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
    food,
    isLoading,
    error,
    showError,
  };
};

export default useFood;
