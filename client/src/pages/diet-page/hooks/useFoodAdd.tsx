import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { ArticleErrResponse, IFood, IFoodList } from 'types/interfaces';

const useFoodAdd = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IFoodList>();
  const addFood = useCallback((data: IFood) => {
    setLoading(true);
    customAxios
      .post(`/api/food/register`, data)
      .then((response) => {
        setResult({ status: response.status, data: response.data });
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
    addFood,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useFoodAdd;
