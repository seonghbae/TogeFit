import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'common/components/alert-modal';
import Loading from 'common/components/loading';

import { BoardCard } from '.';

import useBoardList from '../hook/useBoardList';

import * as SC from './BoardContainerStyle';

const BoardContainer = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    boardList,
    errorMessage,
    isOpen,
    hasMore,
    setIsOpen,
    setReqNumber,
  } = useBoardList();

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
        {boardList.map((article, index) => {
          if (boardList.length === index + 2) {
            return (
              <div ref={lastArticleRef}>
                <BoardCard
                  key={`custom-card-${Math.random()}`}
                  imgUrl={article.post_image[0]}
                  content={article.contents}
                  tagList={article.tag_list}
                />
              </div>
            );
          }
          return (
            <BoardCard
              key={`custom-card-${Math.random()}`}
              imgUrl={article.post_image[0]}
              content={article.contents}
              tagList={article.tag_list}
            />
          );
        })}
        {/* TODO: 식사 게시글 처리 */}
        {isOpen && <Modal message={errorMessage} handleConfirm={handleClick} />}
      </SC.ContainerSection>
      {isLoading && <Loading />}
    </>
  );
};

export default BoardContainer;
