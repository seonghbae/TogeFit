/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { IBoard, PostResponse } from 'types/interfaces';
import { ArticleModal, Loading, AlertModal as Modal } from 'common/components';
import { BoardCard } from '.';

import useBoardList from '../hook/useBoardList';
import useSearchBoardList from '../hook/useSearchBoardList';

import { searchQueryState } from '../states';

import * as SC from './BoardContainerStyle';
import useBoardInfo from '../hook/useBoardInfo';

const BoardContainer = () => {
  const navigate = useNavigate();
  const [articleOpen, setArticleOpen] = useState(false);
  const searchQuery = useRecoilValue(searchQueryState);

  const {
    isLoading: isPostLoading,
    articleList,
    errorMessage: errorPostMessage,
    isOpen: isPostOpen,
    post,
    setIsOpen: setIsPostOpen,
    getArticle,
    articleId,
  } = useBoardInfo<PostResponse>('post');

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

  const articleModalOpen = (id: string | undefined) => {
    setArticleOpen(true);
    getArticle(id);
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
              like={article.like}
              updateAt={article.updatedAt}
              author={article.nickname}
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
        <BoardCard
          like={article.like}
          updateAt={article.updatedAt}
          author={article.nickname}
          key={index}
          imgUrl={article.post_image[0]}
          content={article.contents}
          tagList={article.tag_list}
          onClick={articleModalOpen}
          id={article._id}
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
      {articleOpen && (
        <ArticleModal
          post={post}
          modalState={setArticleOpen}
          articleId={articleId}
          getArticle={getArticle}
        />
      )}
    </>
  );
};

export default BoardContainer;
