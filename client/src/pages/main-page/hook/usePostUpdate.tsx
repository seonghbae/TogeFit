import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { PostResponse, ArticleErrResponse } from 'types/interfaces';

interface IResult {
  status: number;
  data: PostResponse[];
}

const usePostUpdate = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();

  const updatePost = useCallback(
    ({ postId, data }: { postId: string; data: object }) => {
      setLoading(true);
      customAxios
        .patch(`/api/post/${postId}`, data, { withCredentials: true })
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
    },
    []
  );

  return {
    updatePost,
    result,
    isLoading,
    error,
    showError,
  };
};

export default usePostUpdate;
