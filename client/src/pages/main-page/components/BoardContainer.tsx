/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Modal from 'common/components/alert-modal';
import Loading from 'common/components/loading';
import { IBoard } from 'types/interfaces';
import { BoardCard } from '.';

import useBoardList from '../hook/useBoardList';

import * as SC from './BoardContainerStyle';

import { searchQueryState } from '../states';
import useSearchBoardList from '../hook/useSearchBoardList';

const BoardContainer = () => {
  const navigate = useNavigate();

  const searchQuery = useRecoilValue(searchQueryState);

  const {
    isLoading,
    boardList,
    errorMessage,
    isOpen,
    hasMore,
    setIsOpen,
    setReqNumber,
  } = useBoardList();
  const {
    isSearchLoading,
    searchBoardList,
    searchErrorMessage,
    searchHasMore,
    setSearchReqNumber,
  } = useSearchBoardList();

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

  const searchObserver = useRef<IntersectionObserver>();

  const lastSearchArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (isSearchLoading) {
        return;
      }

      if (searchObserver.current) {
        searchObserver.current.disconnect();
      }

      searchObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && searchHasMore) {
          setSearchReqNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) {
        searchObserver.current.observe(node);
      }
    },
    [isSearchLoading, searchHasMore]
  );

  const handleClick = () => {
    setIsOpen(false);
    navigate('/');
  };

  const boardLayout = (boardData: IBoard[], isSearch: boolean) =>
    boardData.map((article, index) => {
      if (boardData.length === index + 2) {
        return (
          <div
            ref={isSearch ? lastSearchArticleRef : lastArticleRef}
            key={index}
          >
            <BoardCard
              imgUrl={article.post_image[0]}
              content={article.contents}
              tagList={article.tag_list}
            />
          </div>
        );
      }
      return (
        <BoardCard
          key={index}
          imgUrl={article.post_image[0]}
          content={article.contents}
          tagList={article.tag_list}
        />
      );
    });

  return (
    <>
      <SC.ContainerSection>
        {searchQuery
          ? boardLayout(searchBoardList, true)
          : boardLayout(boardList, false)}
        {isOpen && <Modal message={errorMessage} handleConfirm={handleClick} />}
      </SC.ContainerSection>
      {isLoading && <Loading />}
    </>
  );
};

export default BoardContainer;
