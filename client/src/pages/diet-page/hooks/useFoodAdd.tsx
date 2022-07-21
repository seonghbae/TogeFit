import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { ArticleErrResponse, IFood, IFoodList } from 'types/interfaces';

const useFoodAdd = () => {
  const [message, setMessage] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IFoodList>();
  const addFood = useCallback((data: IFood) => {
    setLoading(true);
    customAxios
      .post(`/api/food/register`, data)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ArticleErrResponse>;
          if (responseError && responseError.response) {
            setMessage(responseError.response.data.reason);
          }
        }
      })
      .finally(() => {
        setShowError(true);
        setLoading(false);
      });
  }, []);

  return {
    addFood,
    result,
    isLoading,
    message,
    showError,
    setShowError,
  };
};

export default useFoodAdd;
