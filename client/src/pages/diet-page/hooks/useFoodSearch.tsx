import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';
import { ArticleResponse, IFood } from 'types/interfaces';

interface ISearchFood {
  status: number;
  data: IFood[];
}

const useFoodSearch = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [searchFood, setSearchFood] = useState<ISearchFood>({
    status: 0,
    data: [],
  });

  const getSearchedFood = useCallback((query: string) => {
    setLoading(true);
    customAxios
      .get(`/api/food/search?foodName=${query}`)
      .then((response) => {
        setSearchFood({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<ArticleResponse>;
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
    getSearchedFood,
    searchFood,
    isLoading,
    error,
    showError,
  };
};

export default useFoodSearch;
