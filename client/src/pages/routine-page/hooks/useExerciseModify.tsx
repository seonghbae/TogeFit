import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type ValidationResponse = {
  message: string;
};

interface IData {
  acknowledged: true;
  modifiedCount: 1;
  upsertedId: null;
  upsertedCount: 0;
  matchedCount: 1;
}

interface IResult {
  status: number;
  data: [IData];
}

const useExcerciseModify = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();
  const modifyExercise = useCallback((data: object) => {
    setLoading(true);
    customAxios
      .patch(`/api/routine/`, data, { withCredentials: true })
      .then((response) => {
        console.log('response', response);
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
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
    modifyExercise,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useExcerciseModify;
