/* eslint-disable no-underscore-dangle */
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

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
    id,
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
      <SC.ContainerSection isGrid={articleList.length !== 0}>
        {articleList.length === 0 && <h1>게시글이 존재하지 않습니다.</h1>}
        {articleList.map((article, index) => {
          if (articleList.length === index + 2) {
            return (
              <div ref={lastArticleRef} key={nanoid()}>
                <CustomCard
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
              key={nanoid()}
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
      {articleOpen && (
        <ArticleModal
          post={post}
          modalState={setArticleOpen}
          articleId={id}
          getArticle={getArticle}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default PostContainer;
