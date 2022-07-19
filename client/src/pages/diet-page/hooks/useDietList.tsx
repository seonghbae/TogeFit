import { useCallback, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { dateObjectAtom } from 'recoil/infoState';
import { customAxios } from 'common/api';
import { getUserId } from 'common/utils/getUserId';
import { PostResponse, IDiet } from 'types/interfaces';

const useDietList = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userDietList, setUserDietList] = useState<IDiet[]>([]);
  const [reqNumber, setReqNumber] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const standardDate = useRecoilValue(dateObjectAtom);
  const userId = getUserId();
  const limit = 5;

  useEffect(() => {
    setUserDietList([]);
    setReqNumber(0);
    setHasMore(false);
  }, [standardDate]);

  useEffect(() => {
    const getDietList = () => {
      setLoading(true);
      customAxios
        .get(
          `/api/meal/user?userId=${userId}&limit=${limit}&reqNumber=${reqNumber}`
        )
        .then((response) => {
          setUserDietList((previousArticle) => [
            ...previousArticle,
            ...response.data,
          ]);
          setHasMore(response.data.length > 0);
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
    };
    getDietList();
  }, [standardDate, userId, reqNumber]);

  return {
    userDietList,
    isLoading,
    error,
    showError,
    setReqNumber,
    hasMore,
  };
};

export default useDietList;
