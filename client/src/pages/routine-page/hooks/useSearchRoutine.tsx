import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { IRoutines, IRoutinesInfo } from 'types/interfaces';

type ValidationResponse = {
  message: string;
};

interface IResult {
  status: number;
  data: [IRoutinesInfo];
}

const useSearchRoutine = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const getRoutineList = useCallback((query: string) => {
    setLoading(true);
    customAxios
      .get(`/api/routine/search?routineName=${query}`, {
        withCredentials: true,
      })
      .then((response) => {
        setResult({ status: response.status, data: response.data[0].routines });
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
    getRoutineList,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useSearchRoutine;
