import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type ValidationResponse = {
  message: string;
};

interface IData {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string;
  upsertedCount: number;
  matchedCount: number;
}

interface IResult {
  status: number;
  data: [IData];
}

type paramsType = {
  routineId: string;
};

const useRoutineDelete = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const deleteRoutine = useCallback((data: paramsType) => {
    setLoading(true);
    customAxios
      .delete(`/api/routine/`, { data, withCredentials: true })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
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
    deleteRoutine,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useRoutineDelete;
