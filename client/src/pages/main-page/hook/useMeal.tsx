import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { PostResponse, IDietList } from 'types/interfaces';

const useMeal = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [meal, setMeal] = useState<IDietList>({
    status: 0,
    data: [],
  });

  const getMeal = useCallback(() => {
    setLoading(true);
    customAxios
      .get(`/api/meal/all`)
      .then((response) => {
        setMeal({ status: response.status, data: response.data });
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
    getMeal,
    meal,
    isLoading,
    error,
    showError,
  };
};

export default useMeal;
