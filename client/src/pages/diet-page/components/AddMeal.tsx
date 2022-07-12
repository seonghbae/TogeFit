/* eslint-disable jsx-a11y/label-has-associated-control */
import { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { MEAL_INITIAL_MESSAGE } from 'common/constants';
import { CustomCarousel } from 'common/components';

import dragTargetState from 'pages/add-routine-page/states/dragTargetState';
import foodState from '../states/foodState';
import userMealState from '../states/userMealState';

import FoodModal from './FoodModal';
import useFood from '../hooks/useFood';
import useMealAdd from '../hooks/useMealAdd';
// import { Header } from './components';

import * as SC from './AddMealStyle';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;

type IData = {
  name: string;
  quantity?: string;
};

const AddRoutinePage = () => {
  const navigate = useNavigate();

  const [isCancel, setIsCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dragTarget, setDragTarget] = useRecoilState(dragTargetState);
  const [food, setFood] = useRecoilState(foodState);
  const [userMeal, setUserMeal] = useRecoilState(userMealState);

  const [cache, setCache] = useState<IData[]>([
    {
      name: MEAL_INITIAL_MESSAGE,
    },
  ]);

  const { result, getFood } = useFood();
  const { addMeal } = useMealAdd();

  useEffect(() => {
    if (isCancel) {
      setUserMeal([...cache]);
      setIsCancel(false);
    }
  }, [isCancel]);

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    if (result?.status === 200) {
      const foodList = result.data.map((item) => item.name);
      setFood(foodList);
    }
  }, [result]);

  const handleAddMeal: MouseEventHandler<HTMLButtonElement> = () => {
    const postData = {
      meal_list: userMeal,
    };
    // 로그인하면 주석해제
    // addRoutine(postData);
    // console.log(postData);
    alert(postData);
    navigate('/diet');
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/diet');
  };

  return (
    <SC.AddMealContainer>
      <div>식품 목록</div>
      <SC.ButtonWrapper>
        <button type="button">+</button>
      </SC.ButtonWrapper>
      <div>
        <CustomCarousel
          data={food}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          setData={setFood}
        />
        <CustomCarousel
          objData={userMeal}
          setObjData={setUserMeal}
          draggable={isDraggableCarousel}
          width={90}
          dragTarget={dragTarget}
          setDragTarget={setDragTarget}
          modifyFlag={isUserCustomCarousel}
          setModalView={setIsOpen}
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
      {/* <FoodModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      /> */}
    </SC.AddMealContainer>
  );
};

export default AddRoutinePage;
