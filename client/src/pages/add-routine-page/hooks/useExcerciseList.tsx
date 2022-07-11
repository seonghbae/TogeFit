import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type EmailValidationResponse = {
  message: string;
};

interface IData {
  name: string;
  _id: string;
}

interface IResult {
  status: number;
  data: [IData];
}

const useExcerciseList = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();
  // step1: email로만 요청을 보내 인증 번호 메일 전송 상태 응답을 받는다.
  const getExcerciseList = useCallback(() => {
    setLoading(true);
    customAxios
      .get(`/api/exerciseList`)
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as AxiosError<EmailValidationResponse>;
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
    getExcerciseList,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useExcerciseList;
