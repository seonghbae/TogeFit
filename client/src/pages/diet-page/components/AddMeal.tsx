import { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { MEAL_INITIAL_MESSAGE } from 'common/constants';
import { IMeal } from 'types/interfaces';

import { SearchForm } from 'common/components';
import dragTargetState from 'pages/add-routine-page/states/dragTargetState';
import foodListState from '../states/foodListState';
import mealListState from '../states/mealListState';
import mealIdState from '../states/mealIdState';
import mealUpdateState from '../states/mealUpdateState';
import dietAddState from '../states/dietAddState';
import dietIdState from '../states/dietIdState';

import FoodCarousel from './FoodCarousel';
import MealModal from './MealModal';
import AddFoodModal from './AddFoodModal';
import UpdateFoodModal from './UpdateFoodModal';
import useFood from '../hooks/useFood';
import useMealAdd from '../hooks/useMealAdd';
import useMealUpdate from '../hooks/useMealUpdate';
import useDietAdd from '../hooks/useDietAdd';
import useFoodSearch from '../hooks/useFoodSearch';

import * as SC from './AddMealStyle';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;

const AddMeal = () => {
  const navigate = useNavigate();

  const [isCancel, setIsCancel] = useState(false);
  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isFoodUpdateOpen, setIsFoodUpdateOpen] = useState(false);
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [dragTarget, setDragTarget] = useRecoilState(dragTargetState);
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [mealList, setMealList] = useRecoilState(mealListState);
  const [dietAdd, setDietAdd] = useRecoilState(dietAddState);
  const [mealUpdate, setMealUpdate] = useRecoilState(mealUpdateState);
  const dietId = useRecoilValue(dietIdState);
  const mealId = useRecoilValue(mealIdState);

  const init = [
    {
      foodName: MEAL_INITIAL_MESSAGE,
      quantity: 0,
    },
  ];

  const [cache, setCache] = useState<IMeal[]>(init);

  const { food, getFood } = useFood();
  const { searchFood, getSearchedFood } = useFoodSearch();
  const { addMeal } = useMealAdd();
  const { updateMeal } = useMealUpdate();
  const { addDiet } = useDietAdd();

  useEffect(() => {
    if (mealUpdate) {
      setCache([...mealList]);
    }
  }, []);

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
    if (food.status === 200) {
      const foodNameList = food.data.map((item) => item.name);
      setFoodList(foodNameList);
    }
  }, [food]);

  useEffect(() => {
    if (searchFood.status === 200) {
      const foodNameList = searchFood.data.map((item) => item.name);
      setFoodList(foodNameList);
    }
  }, [searchFood]);

  const handleAddFood: MouseEventHandler<HTMLButtonElement> = () => {
    setIsFoodOpen(true);
  };

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    if (mealUpdate) {
      const patchMeal = {
        mealListId: mealId,
        meals: mealList,
      };
      updateMeal(patchMeal);
      setMealUpdate(false);
    } else if (dietAdd) {
      const postDiet = {
        meals: [mealList],
      };
      addDiet(postDiet);
      setDietAdd(false);
    } else {
      const postMeal = {
        mealArticleId: dietId,
        meals: mealList,
      };
      addMeal(postMeal);
    }

    setMealList(init);
    navigate('/diet');
    window.location.reload();
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setMealList(init);
    navigate('/diet');
  };

  return (
    <SC.AddMealContainer>
      <SC.Header>
        <div>식품 목록</div>
        <SearchForm searchFunc={getSearchedFood} />
        <button type="button" onClick={handleAddFood}>
          +
        </button>
      </SC.Header>
      <AddFoodModal
        isOpen={isFoodOpen}
        setIsOpen={setIsFoodOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
      <UpdateFoodModal
        isOpen={isFoodUpdateOpen}
        setIsOpen={setIsFoodUpdateOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
        food={food}
      />
      <SC.CarouselContainer>
        <FoodCarousel
          data={foodList}
          setData={setFoodList}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          setModalView={setIsFoodUpdateOpen}
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
      </SC.CarouselContainer>
      <SC.ButtonContainer>
        <button type="button" onClick={handleAddMeal}>
          확인
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </SC.ButtonContainer>
      <MealModal
        isOpen={isMealOpen}
        setIsOpen={setIsMealOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
    </SC.AddMealContainer>
  );
};

export default AddMeal;
