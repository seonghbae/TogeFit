/* eslint-disable no-underscore-dangle */
import Modal from 'common/components/alert-modal';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import Loading from 'common/components/loading';
import { MealResponse } from 'types/interfaces';
import MealCard from 'common/components/meal-card';
import * as SC from './MealContainerStyle';
import useArticle from '../hook/useArticle';

const ArticleContainer = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    articleList,
    errorMessage,
    isOpen,
    hasMore,
    setIsOpen,
    setReqNumber,
  } = useArticle<MealResponse>('meal');

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

  const handleClick = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <SC.ContainerSection>
        {articleList.map((article, index) => {
          if (articleList.length === index + 2) {
            return (
              <div ref={lastArticleRef}>
                <MealCard key={article._id} />
              </div>
            );
          }
          return <MealCard key={article._id} />;
        })}
        {isOpen && <Modal message={errorMessage} handleConfirm={handleClick} />}
      </SC.ContainerSection>
      {isLoading && <Loading />}
    </>
  );
};

export default ArticleContainer;
