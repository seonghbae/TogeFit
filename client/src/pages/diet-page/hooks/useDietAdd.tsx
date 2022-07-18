import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { ArticleResponse, IMeal, IDiet } from 'types/interfaces';

interface IResult {
  status: number;
  data: IDiet[];
}

const useDietAdd = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const addDiet = useCallback((data: { meals: IMeal[][] }) => {
    setLoading(true);
    customAxios
      .post(`/api/meal/register`, data, { withCredentials: true })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ArticleResponse>;
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
    addDiet,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useDietAdd;
