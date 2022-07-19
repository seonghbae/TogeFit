import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { PostResponse, IMealList } from 'types/interfaces';

interface IResult {
  status: number;
  data: IMealList[];
}

const useMealDelete = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const deleteMeal = useCallback((data: { mealListId: string }) => {
    setLoading(true);
    customAxios
      .delete(`/api/meal/one`, { data, withCredentials: true })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<PostResponse>;
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
    deleteMeal,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useMealDelete;
