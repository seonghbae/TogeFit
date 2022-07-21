import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { PostResponse, ArticleErrResponse } from 'types/interfaces';

interface IResult {
  status: number;
  data: PostResponse[];
}

const usePostAdd = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const addPost = useCallback((data: object) => {
    setLoading(true);
    customAxios
      .post(`/api/post/register`, data, { withCredentials: true })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ArticleErrResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.reason);
            setShowError(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    addPost,
    result,
    isLoading,
    error,
    showError,
  };
};

export default usePostAdd;
