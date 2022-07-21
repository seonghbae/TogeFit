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

const useComment = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const addComment = useCallback((data: object) => {
    setLoading(true);
    customAxios
      .post(`/api/post/comment`, data)
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
    addComment,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useComment;
