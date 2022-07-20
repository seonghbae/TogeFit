/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { getUserId } from 'common/utils/getUserId';
import dietState from 'pages/diet-page/states/dietState';
import useRoutineList from 'pages/routine-page/hooks/useRoutineList';
import routineState from '../states/routineState';
import PostCarousel from './PostCarousel';
import MealModal from './MealModal';
import RoutineModal from './RoutineModal';
import usePostAdd from '../hook/usePostAdd';
import useMeal from '../hook/useMeal';

import * as SC from './PostPageStyle';

interface IPost {
  contents: string;
  meal: string;
  routine: string;
  tag_list: string;
  is_open: string;
  post_image: FileList;
}

const PostPage = () => {
  const [mealList, setMealList] = useState<Array<string | number | null>>([]);
  const [routines, setRoutines] = useState<Array<string | number | null>>([]);
  const [isTagWrong, setIsTagWrong] = useState<boolean>(false);
  const [food, setFood] = useRecoilState(dietState);
  const [routine, setRoutine] = useRecoilState(routineState);
  const { meal, getMeal } = useMeal();
  const { getRoutineList, result } = useRoutineList();
  const { register, handleSubmit, resetField, setValue } = useForm<IPost>({
    defaultValues: {
      contents: '',
      meal: '',
      routine: '',
      tag_list: '',
      is_open: '',
      post_image: undefined,
    },
  });
  const userId = getUserId();
  const [isCancel, setIsCancel] = useState(false);
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const { addPost } = usePostAdd();

  const getDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  useEffect(() => {
    getMeal();
    getRoutineList();
  }, []);

  useEffect(() => {
    setMealList(
      meal.data
        .filter((mealItem) => mealItem.userId === userId)
        .map((mealItem) => getDate(mealItem.createdAt))
    );
  }, [meal]);

  useEffect(() => {
    if (result?.data !== null) {
      const routineList = result?.data.routines.map(
        (routineItem) => routineItem.routine_name
      );
      if (routineList !== undefined) {
        setRoutines(routineList);
      }
    }
  }, [result]);

  const handleCancel = () => {
    //
  };

  const tagValidation = (tagList: string) => {
    const regex1 = /[A-Za-zㄱ-ㅎ가-힣0-9,]*/;
    const regex2 = /[ ]+/;
    const regex3 = /[,]{2}/;
    if (!regex1.test(tagList)) {
      return false;
    }
    if (regex2.test(tagList)) {
      return false;
    }
    if (
      tagList.charAt(0) === ',' ||
      tagList.charAt(tagList.length - 1) === ','
    ) {
      return false;
    }
    if (regex3.test(tagList)) {
      return false;
    }
    return true;
  };

  const handleMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('meal', e.target.value);
  };

  const handleRoutineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('routine', e.target.value);
  };

  const onSubmit: SubmitHandler<IPost> = (data) => {
    if (tagValidation(data.tag_list)) {
      setIsTagWrong(false);
    } else {
      setIsTagWrong(true);
      return;
    }

    const formData = new FormData();
    formData.append('post_image', data.post_image[0]);
    formData.append('contents', data.contents);
    formData.append('meal', food._id);
    formData.append('routine', routine._id);
    formData.append('tag_list', data.tag_list);

    setValue('meal', food._id);
    setValue('routine', routine._id);
    addPost(formData);
    resetField('contents');
    resetField('meal');
    resetField('routine');
    resetField('tag_list');
    resetField('is_open');
    resetField('post_image');
    setFood({
      userId: '',
      meals: [],
      createdAt: '',
      _id: '',
    });
    setRoutine({
      routine_name: '',
      routine_list: [],
      _id: '',
    });
  };

  return (
    <SC.AddPostContainer>
      <SC.FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <h2>게시글 작성</h2>
        <SC.InputContainer>
          <label htmlFor="contents">게시글 내용</label>
          <textarea
            {...register('contents')}
            placeholder="내용을 입력해주세요."
          />
          <label htmlFor="meal">식단 선택</label>
          <PostCarousel
            data={mealList}
            setData={setMealList}
            width={80}
            mealData={meal}
            setModalView={setIsMealOpen}
          />
          <input
            type="text"
            value={
              food.createdAt === ''
                ? '식단을 선택해주세요.'
                : getDate(food.createdAt)
            }
            readOnly
          />
          <input
            {...register('meal', { onChange: handleMealChange })}
            type="text"
            value={food._id}
          />
          <label htmlFor="routine">루틴 선택</label>
          <PostCarousel
            data={routines}
            setData={setRoutines}
            width={80}
            routineData={result}
            setModalView={setIsRoutineOpen}
          />
          <input
            type="text"
            value={
              routine.routine_name === ''
                ? '루틴을 선택해주세요.'
                : routine.routine_name
            }
            readOnly
          />
          <input
            {...register('routine', { onChange: handleRoutineChange })}
            type="text"
            value={routine._id}
          />
          <label htmlFor="tag_list">태그 선택</label>
          <input
            {...register('tag_list')}
            type="text"
            placeholder="a,b,c 형식으로 태그를 입력해주세요."
          />
          {isTagWrong && <div>a,b,c 형식으로 태그를 입력해주세요.</div>}
          <label htmlFor="post_image">이미지 선택</label>
          <input {...register('post_image')} type="file" accept="image/*" />
          <label htmlFor="is_open">게시글 공개 여부</label>
          <SC.RadioBoxContainer>
            <input {...register('is_open')} type="radio" value="공개" checked />
            공개
            <input {...register('is_open')} type="radio" value="비공개" />
            비공개
          </SC.RadioBoxContainer>
        </SC.InputContainer>
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </SC.FormWrapper>
      <MealModal
        isOpen={isMealOpen}
        setIsOpen={setIsMealOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
      <RoutineModal
        isOpen={isRoutineOpen}
        setIsOpen={setIsRoutineOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
    </SC.AddPostContainer>
  );
};

export default PostPage;
