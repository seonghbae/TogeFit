import { useState, useEffect } from 'react';
import { customAxios } from 'common/api';
import { dateObjectAtom } from 'recoil/infoState';
import { useRecoilValue } from 'recoil';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

type comment = {
  content: string;
  author: string;
};

type tagType = {
  tag: string;
  _id: string;
};

interface ArticleResponse {
  userId: string;
  contents: string;
  post_image: Array<string>;
  is_open: boolean;
  tag_list: Array<tagType>;
  like: number;
  comments: Array<comment>;
  meal: string;
  routine: string;
  message: string;
}

interface ArticleResponse {
  reason: string;
}

const useArticle = () => {
  const [isLoading, setLoading] = useState(false);
  const standardDate = useRecoilValue(dateObjectAtom);
  const [articleList, setArticleList] = useState<Array<ArticleResponse>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [reqNumber, setReqNumber] = useState(1);
  const { userId } = useParams();

  useEffect(() => {
    setArticleList([]);
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
        setArticleList((previousArticle) => {
          console.log(previousArticle);
          return [...previousArticle, ...response.data];
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ArticleResponse>;
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
    setIsOpen,
    setReqNumber,
  };
};

export default useArticle;
