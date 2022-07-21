import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';

import { customAxios } from 'common/api';
import loadingThrottle from 'common/utils/loadingThrottle';
import { IBoard, IError } from 'types/interfaces';
import searchQueryState from '../states/searchQueryState';

const useSearchBoardList = () => {
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchBoardList, setSearchBoardList] = useState<IBoard[]>([]);
  const [searchErrorMessage, setSearchErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchReqNumber, setSearchReqNumber] = useState(0);
  const [searchHasMore, setSearchHasMore] = useState(false);
  const tagName = useRecoilValue(searchQueryState);

  async function getSearchBoardList() {
    try {
      const response = await customAxios.get(
        `/api/post/search?tagName=${tagName}&limit=5&reqNumber=${searchReqNumber}`
      );
      setSearchBoardList((previousBoard) => [
        ...previousBoard,
        ...response.data,
      ]);
      setSearchHasMore(response.data.length > 0);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseError = err as AxiosError<IError>;
        if (responseError && responseError.response) {
          setSearchErrorMessage(responseError.response.data.message);
          setIsOpen(true);
        }
      }
    }
  }

  useEffect(() => {
    setSearchBoardList([]);
    setSearchReqNumber(0);
    loadingThrottle(1, getSearchBoardList, setIsSearchLoading);
  }, [tagName]);

  useEffect(() => {
    loadingThrottle(1.5, getSearchBoardList, setIsSearchLoading);
  }, [searchReqNumber]);

  return {
    isSearchLoading,
    searchBoardList,
    searchErrorMessage,
    isOpen,
    searchHasMore,
    setIsOpen,
    setSearchReqNumber,
  };
};

export default useSearchBoardList;
