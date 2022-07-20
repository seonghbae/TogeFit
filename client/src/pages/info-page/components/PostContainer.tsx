/* eslint-disable no-underscore-dangle */
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';

import CustomCard from 'common/components/custom-card/CustomCard';
import Loading from 'common/components/loading';
import { AlertModal, ArticleModal } from 'common/components';
import { PostResponse } from 'types/interfaces';

import * as SC from './PostContainerStyle';
import useArticle from '../hook/useArticle';

const PostContainer = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    articleList,
    errorMessage,
    isOpen,
    hasMore,
    post,
    setIsOpen,
    setReqNumber,
    getArticle,
  } = useArticle<PostResponse>('post');
  const [articleOpen, setArticleOpen] = useState(false);

  const observer = useRef<IntersectionObserver>();
  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setReqNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handleComfirm = () => {
    setIsOpen(false);
    navigate('/');
  };

  const articleModalOpen = (articleId: string | undefined) => {
    setArticleOpen(true);
    getArticle(articleId);
  };

  return (
    <>
      <SC.ContainerSection>
        {articleList.map((article, index) => {
          if (articleList.length === index + 2) {
            return (
              <div ref={lastArticleRef}>
                <CustomCard
                  key={article._id}
                  imgUrl={article.post_image[0]}
                  content={article.contents}
                  tagList={article.tag_list}
                  onClick={articleModalOpen}
                  id={article._id}
                />
              </div>
            );
          }
          return (
            <CustomCard
              key={article._id}
              imgUrl={article.post_image[0]}
              content={article.contents}
              tagList={article.tag_list}
              onClick={articleModalOpen}
              id={article._id}
            />
          );
        })}
        {isOpen && (
          <AlertModal message={errorMessage} handleConfirm={handleComfirm} />
        )}
      </SC.ContainerSection>
      {articleOpen && <ArticleModal post={post} modalState={setArticleOpen} />}
      {isLoading && <Loading />}
    </>
  );
};

export default PostContainer;
