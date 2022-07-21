import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { ArticleErrResponse, IFoodList } from 'types/interfaces';

const useFood = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [food, setFood] = useState<IFoodList>({
    status: 0,
    data: [],
  });

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
          const responseError = err as AxiosError<ArticleErrResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.reason);
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
