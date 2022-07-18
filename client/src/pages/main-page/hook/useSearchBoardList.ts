import { useState, useEffect } from 'react';
import { customAxios } from 'common/api';
import axios, { AxiosError } from 'axios';

import { IBoard, IError } from 'types/interfaces';
import { useRecoilValue } from 'recoil';
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
    setIsSearchLoading(true);
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
    setIsSearchLoading(false);
  }

  useEffect(() => {
    setSearchBoardList([]);
    setSearchReqNumber(0);
    getSearchBoardList();
  }, [tagName]);

  useEffect(() => {
    getSearchBoardList();
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
