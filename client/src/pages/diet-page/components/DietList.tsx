import { MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFood from '../hooks/useFood';
import useDietList from '../hooks/useDietList';
import { ChartList } from './ChartList';
import * as SC from './DietListStyle';

const DietList = () => {
  const { food, getFood } = useFood();
  const { userDietList, getDietList } = useDietList();
  const navigate = useNavigate();

  useEffect(() => {
    getFood();
    getDietList();
  }, []);

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/diet/add');
  };

  return (
    <SC.DietListContainer>
      <div>dietList</div>
      <SC.ButtonWrapper>
        <button type="button" onClick={handleAddMeal}>
          +
        </button>
      </SC.ButtonWrapper>
      {food?.status === 200 && userDietList?.status === 200 && (
        <ChartList food={food} dietList={userDietList} />
      )}
    </SC.DietListContainer>
  );
};

export default DietList;
