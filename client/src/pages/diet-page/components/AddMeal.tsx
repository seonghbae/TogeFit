import { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { MEAL_INITIAL_MESSAGE } from 'common/constants';

import dragTargetState from 'pages/add-routine-page/states/dragTargetState';
import foodListState from '../states/foodListState';
import mealListState from '../states/mealListState';

import FoodCarousel from './FoodCarousel';
import MealModal from './MealModal';
import FoodModal from './FoodModal';
import useFood from '../hooks/useFood';
import useMealAdd from '../hooks/useMealAdd';

import * as SC from './AddMealStyle';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;

type Meal = {
  foodName: string;
  quantity?: number;
};

const AddRoutinePage = () => {
  const navigate = useNavigate();

  const [isCancel, setIsCancel] = useState(false);
  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [dragTarget, setDragTarget] = useRecoilState(dragTargetState);
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [mealList, setMealList] = useRecoilState(mealListState);

  const [cache, setCache] = useState<Meal[]>([
    {
      foodName: MEAL_INITIAL_MESSAGE,
    },
  ]);

  const { food, getFood } = useFood();
  const { addMeal } = useMealAdd();

  useEffect(() => {
    if (isCancel) {
      setMealList([...cache]);
      setIsCancel(false);
    }
  }, [isCancel]);

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    if (food?.status === 200) {
      const foodNameList = food.data.map((item) => item.name);
      setFoodList(foodNameList);
    }
  }, [food]);

  const handleAddFood: MouseEventHandler<HTMLButtonElement> = () => {
    setIsFoodOpen(true);
  };

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    const postData = {
      meal_list: mealList,
    };

    // addMeal(postData);
    // navigate('/diet');
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/diet');
  };

  return (
    <SC.AddMealContainer>
      <div>식품 목록</div>
      <SC.ButtonWrapper>
        <button type="button" onClick={handleAddFood}>
          +
        </button>
      </SC.ButtonWrapper>
      <FoodModal
        isOpen={isFoodOpen}
        setIsOpen={setIsFoodOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
      <div>
        <FoodCarousel
          data={foodList}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          setData={setFoodList}
        />
        <FoodCarousel
          objData={mealList}
          setObjData={setMealList}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          modifyFlag={isUserCustomCarousel}
          setModalView={setIsMealOpen}
          isCancel={isCancel}
          setIsCancel={setIsCancel}
          objCache={cache}
          setObjCache={setCache}
        />
      </div>
      <button type="button" onClick={handleAddMeal}>
        확인
      </button>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
      <MealModal
        isOpen={isMealOpen}
        setIsOpen={setIsMealOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
    </SC.AddMealContainer>
  );
};

export default AddRoutinePage;
