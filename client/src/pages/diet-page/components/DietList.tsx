import { useEffect } from 'react';
import useFood from '../hooks/useFood';
import useDietList from '../hooks/useDietList';
import { ChartList } from './ChartList';
import * as SC from './DietListStyle';

const DietList = () => {
  const { food, getFood } = useFood();
  const { userDietList, getDietList } = useDietList();

  useEffect(() => {
    getFood();
    getDietList();
  }, []);

  return (
    <SC.DietListContainer>
      <div>dietList</div>
      {food?.status === 200 && userDietList?.status === 200 && (
        <ChartList food={food} userDietList={userDietList} />
      )}
    </SC.DietListContainer>
  );
};

export default DietList;
