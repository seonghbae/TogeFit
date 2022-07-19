import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { PostResponse } from 'types/interfaces';

interface IResult {
  status: number;
  data: {
    deletedCount: number;
  };
}

const useDietDelete = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const deleteDiet = useCallback((data: { mealArticleId: string }) => {
    setLoading(true);
    customAxios
      .delete(`/api/meal`, { data, withCredentials: true })
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
    deleteDiet,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useDietDelete;
