import { useState, useEffect } from 'react';
import { CustomCarousel } from 'common/components';
import { useConfirmModal } from 'common/hooks';
import FoodModal from './FoodModal';
import * as SC from './AddMealStyle';

const isDraggableCarousel = true;
const isUserCustomCarousel = true;
const MEAL_INITIAL_MESSAGE = '위 음식을 드래그 해주세요.';

const AddMeal = () => {
  const { isCancel, setIsCancel, open, setOpen, renderConfirmModal } =
    useConfirmModal({
      childComponent: FoodModal,
      handleConfirmFunc: () => {
        console.log('something logic');
      },
    });

  const [dragTarget, setDragTarget] = useState<string | number | null>(null);

  const [food, setFood] = useState<Array<string | number | null>>([
    '닭가슴살',
    '쌀밥',
    '바나나',
    '오트밀',
  ]);

  const [userCustom, setUserCustom] = useState<Array<string | number | null>>([
    MEAL_INITIAL_MESSAGE,
  ]);

  const [cache, setCache] = useState<Array<string | number | null>>([
    MEAL_INITIAL_MESSAGE,
  ]);

  useEffect(() => {
    if (isCancel) {
      setUserCustom([...cache]);
      setIsCancel(false);
    }
  }, [isCancel]);

  return (
    <SC.AddMealContainer>
      <div>식품 목록</div>
      <SC.ButtonWrapper>
        <button type="button">+</button>
      </SC.ButtonWrapper>
      <CustomCarousel
        data={food}
        draggable={isDraggableCarousel}
        width={90}
        dragTarget={dragTarget}
        setDragTarget={setDragTarget}
        setData={setFood}
      />
      <CustomCarousel
        data={userCustom}
        draggable={isDraggableCarousel}
        width={90}
        dragTarget={dragTarget}
        setDragTarget={setDragTarget}
        setData={setUserCustom}
        modifyFlag={isUserCustomCarousel}
        setModalView={setOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
        setCache={setCache}
        cache={cache}
      />
      <button type="button">확인</button>
      <button type="button">취소</button>
      {renderConfirmModal()}
    </SC.AddMealContainer>
  );
};

export default AddMeal;
