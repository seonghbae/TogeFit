import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type ValidationResponse = {
  message: string;
};

interface IData {
  name: string;
  _id: string;
}

interface IResult {
  status: number;
  data: [IData];
}

const useExcerciseList = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const getExcerciseList = useCallback(() => {
    setLoading(true);
    customAxios
      .get(`/api/exerciseList`)
      .then((response) => {
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
    getExcerciseList,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useExcerciseList;
