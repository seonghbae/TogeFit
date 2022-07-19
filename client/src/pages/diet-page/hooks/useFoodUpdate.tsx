import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { PostResponse, IFood } from 'types/interfaces';

interface IData extends IFood {
  foodId: string;
}

interface IResult {
  status: number;
  data: IFood[];
}

const useFoodUpdate = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const updateFood = useCallback((data: IData) => {
    setLoading(true);
    customAxios
      .patch(`/api/food`, data)
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
    updateFood,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useFoodUpdate;
