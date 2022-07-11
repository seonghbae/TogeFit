import { useState, useEffect } from 'react';
import { customAxios } from 'common/api';
import { dateObjectAtom } from 'recoil/infoState';
import { useRecoilValue } from 'recoil';

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

const useArticle = () => {
  const [isLoading, setLoading] = useState(false);
  const standardDate = useRecoilValue(dateObjectAtom);
  const [articleList, setArticleList] = useState<Array<ArticleResponse>>([]);

  useEffect(() => {
    async function getArticle() {
      setLoading(true);
      try {
        const response = await customAxios.get(`/api/post/user/test123`);
        setArticleList(response.data);
      } catch (err) {
        // 현재 백엔드에서 던져주는 에러가 없으므로 처리할 것이 없음
        // eslint-disable-next-line no-console
        console.log(err);
      }
      setLoading(false);
    }
    getArticle();
  }, [standardDate]);

  return { isLoading, articleList };
};

export default useArticle;
