import { useState, useEffect } from 'react';
import { customAxios } from 'common/api';
import { dateObjectAtom } from 'recoil/infoState';
import { useRecoilValue } from 'recoil';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { ArticleErrResponse } from 'types/interfaces';

const useBoardInfo = <T>(apiLink: string) => {
  const [isLoading, setLoading] = useState(false);
  const standardDate = useRecoilValue(dateObjectAtom);
  const [articleList, setArticleList] = useState<Array<T>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [reqNumber, setReqNumber] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [post, setPost] = useState<T>();
  const { userId } = useParams();
  const [articleId, setArticleId] = useState<string>();

  const getArticle = async (id: string | undefined) => {
    setLoading(true);
    try {
      const response = await customAxios.get(`/api/post/article/${id}`);
      setArticleId(id);
      setPost(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return {
    isLoading,
    articleList,
    errorMessage,
    isOpen,
    hasMore,
    post,
    setIsOpen,
    setReqNumber,
    getArticle,
    articleId,
  };
};

export default useBoardInfo;
