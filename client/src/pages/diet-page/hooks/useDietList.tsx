import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { IUserDietList } from 'types/interfaces';

type ValidationResponse = {
  message: string;
};

const useDietList = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userDietList, setUserDietList] = useState<IUserDietList>();
  const [reqNumber, setReqNumber] = useState(0);
  //   const { userId } = useParams();
  const userId = 'cozups';
  const limit = 20;

  const getDietList = useCallback(() => {
    setLoading(true);
    customAxios
      .get(
        `/api/meal/user?userId=${userId}&limit=${limit}&reqNumber=${reqNumber}`
      )
      .then((response) => {
        setUserDietList({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ValidationResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    getDietList,
    userDietList,
    isLoading,
    error,
    showError,
  };
};

export default useDietList;
