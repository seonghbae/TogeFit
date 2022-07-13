import { useState, useEffect, useCallback } from 'react';
import { customAxios } from 'common/api';
import { dateObjectAtom } from 'recoil/infoState';
import { useRecoilValue } from 'recoil';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { ArticleResponse, ArticleErrResponse } from 'types/interfaces';

const useArticle = () => {
  const [isLoading, setLoading] = useState(false);
  const standardDate = useRecoilValue(dateObjectAtom);
  const [articleList, setArticleList] = useState<Array<ArticleResponse>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [reqNumber, setReqNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    setArticleList([]);
    setReqNumber(1);
    setHasMore(false);
  }, [standardDate]);

  useEffect(() => {
    async function getArticle() {
      setLoading(true);
      try {
        const response = await customAxios.get(
          `/api/post/list/month?userId=${userId}&year=${
            standardDate.year
          }&month=${standardDate.month + 1}&limit=4&reqNumber=${reqNumber}`
        );
        setArticleList((previousArticle) => [
          ...previousArticle,
          ...response.data,
        ]);
        setHasMore(response.data.length > 0);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ArticleErrResponse>;
          if (responseError && responseError.response) {
            setErrorMessage(responseError.response.data.reason);
            setIsOpen(true);
          }
        }
      }
      setLoading(false);
    }
    getArticle();
  }, [standardDate, userId, reqNumber]);

  return {
    isLoading,
    articleList,
    errorMessage,
    isOpen,
    hasMore,
    setIsOpen,
    setReqNumber,
  };
};

export default useArticle;
