/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { customAxios } from 'common/api';
import Modal from 'common/components/alert-modal';
import Loading from 'common/components/loading';
import { getUserId } from 'common/utils/getUserId';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import isPostUpdateState from 'recoil/isPostUpdateState';
import postState from 'recoil/postState';
import { IBoardPost, IDietList, IDiet, IRoutinesInfo } from 'types/interfaces';

import * as SC from './PostFormStyle';

const PostForm = () => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [tag, setTag] = useState('');
  const [meal, setMeal] = useState('');
  const [isPostUpdate, setIsPostUpdate] = useRecoilState(isPostUpdateState);
  const [postItem, setPostItem] = useRecoilState(postState);

  const [dietList, setdietList] = useState<IDietList>();
  const [routines, setRoutines] = useState<IRoutinesInfo[]>();
  const userId = getUserId();
  const date = new Date();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IBoardPost>({ mode: 'onChange' });

  useEffect(() => {
    if (userId) {
      customAxios.get('/api/routine/').then((res) => {
        setRoutines(res.data.routines);
      });

      customAxios
        .get(
          `/api/meal/user?userId=${userId}&limit=9999&reqNumber=0&year=${date.getFullYear()}&month=${
            date.getMonth() + 1
          }`
        )
        .then((res) => {
          setdietList(res);
        });
    }
  }, [userId]);

  const modifyBoardData = (data: IBoardPost) => {
    const postData = {
      ...data,
      tag_list: tagList.join(','),
      post_image: data.post_image[0],
    };
    const formData = new FormData();

    formData.append('post_image', data.post_image[0]);
    formData.append('userId', data.userId);
    formData.append('contents', data.contents);
    formData.append('is_open', 'true');
    formData.append('tag_list', tagList.join(','));

    if (data.meal) formData.append('meal', data.meal);
    if (data.routine) formData.append('routine', data.routine);

    customAxios.patch(`/api/post/${postItem._id}`, formData).then((res) => {
      if (res.status === 201) {
        window.location.href = '/';
      }
    });
  };

  const postBoardData = (data: IBoardPost) => {
    const postData = {
      ...data,
      tag_list: tagList.join(','),
      post_image: data.post_image[0],
    };
    const formData = new FormData();

    formData.append('post_image', data.post_image[0]);
    formData.append('userId', data.userId);
    formData.append('contents', data.contents);
    formData.append('is_open', 'true');
    formData.append('tag_list', tagList.join(','));
    if (data.meal) formData.append('meal', data.meal);
    if (data.routine) formData.append('routine', data.routine);

    customAxios.post(`/api/post/register`, formData).then((res) => {
      if (res.status === 201) {
        window.location.href = '/';
      }
    });
  };

  const onSubmit = (data: IBoardPost) =>
    isPostUpdate ? modifyBoardData(data) : postBoardData(data);

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTagList((cur) => [...cur, tag]);
      setTag('');
    }
  };

  const isToday = (dateString: string) => {
    const targetDate = new Date(dateString);
    return targetDate.getDate() === date.getDate();
    // return targetDate.getDate() === 15;
  };

  useEffect(() => {
    console.log(isPostUpdate);
    if (isPostUpdate) {
      setValue('contents', postItem.contents);
      setTagList(Object.values(postItem.tag_list).map((item) => item.tag));
      console.log(postItem.routine_info);
      if (postItem.routine_info) {
        console.log(postItem.routine_info);

        // setValue('routine', postItem);
      }
    } else {
      setValue('contents', '');
      setTagList([]);
    }
  }, []);

  return (
    <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="post_image">이미지 선택</label>
        <input
          {...register('post_image')}
          type="file"
          accept="image/*"
          multiple
        />
      </div>
      <div>
        <label htmlFor="contents">
          글 내용<span>*</span>
        </label>
        <textarea
          id="contents"
          {...register('contents', {
            required: true,
            maxLength: 1000,
          })}
        />
        {errors.contents && errors.contents.type === 'required' && (
          <p>글을 입력해주세요!</p>
        )}
      </div>
      <div>
        <label htmlFor="contents">태그</label>
        <input
          id="tag"
          placeholder="엔터를 눌러주세요."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />
        <SC.TagContainer>
          {tagList.map((tagEle, i) => (
            <SC.Tag key={i}>{`#${tagEle}`}</SC.Tag>
          ))}
        </SC.TagContainer>
      </div>

      <div>
        <label htmlFor="meal">오늘의 식단</label>

        <div>
          {dietList?.data ? (
            dietList.data.filter((diet, i) => isToday(diet.createdAt))[0] ? (
              <input
                id="meal"
                {...register('meal')}
                value={
                  dietList.data.filter((diet, i) => isToday(diet.createdAt))[0]
                    ._id
                }
              />
            ) : (
              '오늘의 식단이 없습니다.'
            )
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="routine">오늘의 루틴</label>
        <select {...register('routine')}>
          <option value="">없음</option>
          {routines
            ? routines.map((routine) => (
                <option value={routine._id} key={routine._id}>
                  {routine.routine_name}
                </option>
              ))
            : null}
        </select>
      </div>

      <SC.RegisterButton type="submit" ref={buttonRef}>
        {isPostUpdate ? '수정하기' : '작성하기'}
      </SC.RegisterButton>
    </SC.StyledForm>
  );
};

export default PostForm;
