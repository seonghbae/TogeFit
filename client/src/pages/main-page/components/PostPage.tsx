/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserId } from 'common/utils/getUserId';
import dietState from 'pages/diet-page/states/dietState';
import useRoutineList from 'pages/routine-page/hooks/useRoutineList';
import isPostUpdateState from 'recoil/isPostUpdateState';
import postState from 'recoil/postState';
import routineState from '../states/routineState';
import PostCarousel from './PostCarousel';
import MealModal from './MealModal';
import RoutineModal from './RoutineModal';
import usePostAdd from '../hook/usePostAdd';
import usePostUpdate from '../hook/usePostUpdate';
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
  const [isPostUpdate, setIsPostUpdate] = useRecoilState(isPostUpdateState);
  const [postItem, setPostItem] = useRecoilState(postState);
  const { meal, getMeal } = useMeal();
  const { getRoutineList, result } = useRoutineList();
  const { register, handleSubmit, resetField, setValue } = useForm<IPost>();
  const userId = getUserId();
  const [isCancel, setIsCancel] = useState(false);
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const { addPost } = usePostAdd();
  const { updatePost } = usePostUpdate();
  const navigate = useNavigate();

  const getDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  useEffect(() => {
    getMeal();
    getRoutineList();
    if (isPostUpdate) {
      // setFood({
      //   userId: postItem.userId,
      //   // meals: postItem.meal_info.map((mealItem) => ({
      //   //   meal_list: mealItem,
      //   //   _id: '',
      //   // })),
      //   createdAt: '',
      //   _id: '',
      // });
      setRoutine(postItem.routine_info);
    }
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

  const clearPage = () => {
    if (isPostUpdate) {
      setIsPostUpdate(false);
      // setPostItem({
      //   _id: '',
      //   userId: '',
      //   contents: '',
      //   post_image: [],
      //   is_open: false,
      //   tag_list: [],
      //   like: 0,
      //   comments: [],
      //   meal_info: [],
      //   routine_info: [],
      //   message: '',
      //   updatedAt: '',
      //   meal_createdAt: '',
      // });
    }
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
    setRoutine([]);
    navigate('/');
  };

  const handleCancel = () => {
    clearPage();
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

  const handleIsTagWrong = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTagWrong) {
      setIsTagWrong(false);
    }
    setValue('tag_list', e.target.value);
  };

  const handleContents = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('contents', e.target.value);
  };
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('is_open', e.target.value);
    postItem.is_open = e.target.value === 'true';
  };

  const onSubmit: SubmitHandler<IPost> = (data) => {
    if (!tagValidation(data.tag_list)) {
      setIsTagWrong(true);
      return;
    }

    const formRoutineData =
      result?.data._id === undefined ? '' : result?.data._id;
    const formData = new FormData();
    for (let i = 0; i < data.post_image.length; i += 1) {
      formData.append('post_image', data.post_image[i]);
    }
    formData.append('contents', data.contents);
    formData.append('meal', food._id);
    formData.append('routine', formRoutineData);
    formData.append('tag_list', data.tag_list);
    formData.append('is_open', data.is_open ? 'true' : 'false');

    setValue('meal', food._id);
    setValue('routine', formRoutineData);

    if (isPostUpdate) {
      updatePost({ postId: postItem._id, data: formData });
    } else {
      addPost(formData);
    }

    clearPage();
  };

  return (
    <SC.AddPostContainer>
      <SC.FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <h2>게시글 작성</h2>
        {isPostUpdate ? (
          <SC.InputContainer>
            <label htmlFor="contents">게시글 내용</label>
            <SC.TextareaWrapper
              {...register('contents', { onChange: handleContents })}
              placeholder="내용을 입력해주세요."
              defaultValue={postItem.contents}
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
              defaultValue={getDate(postItem.meal_createdAt)}
              value={
                food.createdAt === ''
                  ? '식단을 선택해주세요.'
                  : getDate(food.createdAt)
              }
              readOnly
            />
            <SC.HiddenInput
              {...register('meal', { onChange: handleMealChange })}
              type="text"
              defaultValue={food._id}
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
              defaultValue={postItem?.routine_info[0].routine_name}
              value={
                routine.length === 0
                  ? '루틴을 선택해주세요.'
                  : routine[0].routine_name
              }
              readOnly
            />
            <SC.HiddenInput
              {...register('routine', { onChange: handleRoutineChange })}
              type="text"
              defaultValue={
                result?.data._id === undefined ? '' : result?.data._id
              }
            />
            <label htmlFor="tag_list">태그 선택</label>
            <SC.TagExampleWrapper>
              예시 : 운동,식단 혹은 산책,공원 등
            </SC.TagExampleWrapper>
            <SC.InputWrapper
              {...register('tag_list', { onChange: handleIsTagWrong })}
              type="text"
              placeholder="a,b,c 형식으로 태그를 입력해주세요."
              defaultValue={postItem.tag_list
                .map((tagInfo) => tagInfo.tag)
                .join(',')}
            />
            {isTagWrong && (
              <SC.TagWrongWrapper>
                a,b,c 형식으로 태그를 입력해주세요.
              </SC.TagWrongWrapper>
            )}
            <label htmlFor="post_image">이미지 선택</label>
            <input
              {...register('post_image')}
              type="file"
              accept="image/*"
              multiple
            />
            <label htmlFor="is_open">게시글 공개 여부</label>
            <SC.RadioBoxContainer>
              <input
                {...register('is_open', { onChange: handleRadio })}
                type="radio"
                defaultValue="true"
                checked={postItem.is_open}
              />
              공개
              <input
                {...register('is_open', { onChange: handleRadio })}
                type="radio"
                defaultValue="false"
                checked={!postItem.is_open}
              />
              비공개
            </SC.RadioBoxContainer>
          </SC.InputContainer>
        ) : (
          <SC.InputContainer>
            <label htmlFor="contents">게시글 내용</label>
            <SC.TextareaWrapper
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
            <SC.HiddenInput
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
                routine.length === 0
                  ? '루틴을 선택해주세요.'
                  : routine[0].routine_name
              }
              readOnly
            />
            <SC.HiddenInput
              {...register('routine', { onChange: handleRoutineChange })}
              type="text"
              value={result?.data._id === undefined ? '' : result?.data._id}
            />
            <label htmlFor="tag_list">태그 선택</label>
            <SC.TagExampleWrapper>
              예시 : 운동,식단 혹은 산책,공원 등
            </SC.TagExampleWrapper>
            <SC.InputWrapper
              {...register('tag_list', { onChange: handleIsTagWrong })}
              type="text"
              placeholder="a,b,c 형식으로 태그를 입력해주세요."
            />
            {isTagWrong && (
              <SC.TagWrongWrapper>
                a,b,c 형식으로 태그를 입력해주세요.
              </SC.TagWrongWrapper>
            )}
            <label htmlFor="post_image">이미지 선택</label>
            <input
              {...register('post_image')}
              type="file"
              accept="image/*"
              multiple
            />
            <label htmlFor="is_open">게시글 공개 여부</label>
            <SC.RadioBoxContainer>
              <input
                {...register('is_open')}
                type="radio"
                value="true"
                checked
              />
              공개
              <input {...register('is_open')} type="radio" value="false" />
              비공개
            </SC.RadioBoxContainer>
          </SC.InputContainer>
        )}
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
