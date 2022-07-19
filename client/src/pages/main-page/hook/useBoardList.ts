import { useState, useEffect } from 'react';
import { customAxios } from 'common/api';
import axios, { AxiosError } from 'axios';

import { IBoard, IError } from 'types/interfaces';

const useBoardList = () => {
  const [isLoading, setLoading] = useState(false);
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [reqNumber, setReqNumber] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function getBoardList() {
      setLoading(true);
      try {
        const response = await customAxios.get(
          `/api/post/all?limit=10&reqNumber=${reqNumber}`
        );
        setBoardList((previousBoard) => [...previousBoard, ...response.data]);
        setHasMore(response.data.length > 0);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<IError>;
          if (responseError && responseError.response) {
            setErrorMessage(responseError.response.data.message);
            setIsOpen(true);
          }
        }
      }
      setLoading(false);
    }
    getBoardList();
  }, [reqNumber]);

  return {
    isLoading,
    boardList,
    errorMessage,
    isOpen,
    hasMore,
    setIsOpen,
    setReqNumber,
  };
};

export default useBoardList;
