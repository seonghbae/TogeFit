/* eslint-disable no-underscore-dangle */
import { MouseEventHandler, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Modal from 'common/components/alert-modal';
import useFood from '../hooks/useFood';
import useDietList from '../hooks/useDietList';
import dietAddState from '../states/dietAddState';
import { ChartList } from './ChartList';
import * as SC from './DietListStyle';

const DietList = () => {
  const { food, getFood } = useFood();
  const {
    userDietList,
    isLoading,
    setReqNumber,
    hasMore,
    error,
    showError,
    setShowError,
  } = useDietList();
  const [dietAdd, setDietAdd] = useRecoilState(dietAddState);
  const navigate = useNavigate();

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

  useEffect(() => {
    getFood();
  }, []);

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    setDietAdd(true);
    navigate('/diet/add');
  };

  const handleClick = () => {
    setShowError(false);
    navigate('/');
  };

  return (
    <SC.DietListContainer>
      <SC.Header>
        <div>식단 목록</div>
        <button type="button" onClick={handleAddMeal}>
          +
        </button>
      </SC.Header>
      <SC.ChartListContainer>
        {food?.status === 200 &&
          userDietList.map((dietItem, index) => {
            if (userDietList.length - 2 === index) {
              return (
                <div key={dietItem._id} ref={lastArticleRef}>
                  <ChartList food={food} dietItem={dietItem} />
                </div>
              );
            }
            return (
              <ChartList key={dietItem._id} food={food} dietItem={dietItem} />
            );
          })}
      </SC.ChartListContainer>
      {showError && <Modal message={error} handleConfirm={handleClick} />}
    </SC.DietListContainer>
  );
};

export default DietList;
