/* eslint-disable no-underscore-dangle */
import CustomCard from 'common/components/custom-card/CustomCard';
import Modal from 'common/components/alert-modal';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import Loading from 'common/components/loading';
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
    setIsOpen,
    setReqNumber,
  } = useArticle<PostResponse>('post');

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
                <CustomCard
                  key={article._id}
                  imgUrl={article.post_image[0]}
                  content={article.contents}
                  tagList={article.tag_list}
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
            />
          );
        })}
        {isOpen && <Modal message={errorMessage} handleConfirm={handleClick} />}
      </SC.ContainerSection>
      {isLoading && <Loading />}
    </>
  );
};

export default PostContainer;
