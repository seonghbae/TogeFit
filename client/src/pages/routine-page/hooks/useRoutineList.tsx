import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { IRoutines } from 'types/interfaces';

type EmailValidationResponse = {
  message: string;
};

interface IResult {
  status: number;
  data: IRoutines;
}

const useRoutineList = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const getRoutineList = useCallback((userId: string) => {
    setLoading(true);
    customAxios
      .get(`/api/routine/${userId}`)
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as AxiosError<EmailValidationResponse>;
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
    getRoutineList,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useRoutineList;
