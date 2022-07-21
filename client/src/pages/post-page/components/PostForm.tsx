/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { customAxios } from 'common/api';
import { ArrowButton } from 'common/components';
import Modal from 'common/components/alert-modal';
import Loading from 'common/components/loading';
import { getUserId } from 'common/utils/getUserId';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Slider from 'react-slick';
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
  const [showImages, setShowImages] = useState<any>([]);
  const [images, setImages] = useState<any>({});

  const [dietList, setdietList] = useState<IDietList>();
  const [routines, setRoutines] = useState<IRoutinesInfo[]>();
  const userId = getUserId();
  const date = new Date();

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow: <ArrowButton className="arrow-button" />,
    prevArrow: <ArrowButton className="arrow-button" />,
  };

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

  const postBoardData = (data: IBoardPost) => {
    const postData = {
      ...data,
      tag_list: tagList.join(','),
      post_image: data.post_image[0],
    };
    const formData = new FormData();

    for (let i = 0; i < images.length; i += 1) {
      formData.append('post_image', images[i] as File);
    }

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

  const onSubmit = (data: IBoardPost) => postBoardData(data);

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
    // return targetDate.getDate() === 10;
  };
  // 이미지 상대경로 저장
  const handleAddImages = (event: any) => {
    const imageLists = event.target.files;
    setImages(event.target.files);
    let imageUrlLists = [];
    // let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: string) => {
    setShowImages(showImages.filter((_: any, index: string) => index !== id));
    // setImages(delete images[id]);
    const fileArray = Array.from(images);
    setImages({ ...fileArray.filter((_: any, index: any) => index !== id) });
  };

  return (
    <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="post_image">이미지 선택</label>
        <label htmlFor="input-file" onChange={handleAddImages}>
          <input
            type="file"
            id="input-file"
            multiple
            {...register('post_image')}
          />
        </label>
        <Slider {...settings}>
          {showImages.map((image: any, id: string) => (
            <SC.Slide key={id}>
              <img src={image} alt={`${image}-${id}`} />
              {/* <button onClick={() => handleDeleteImage(id)} type="button">
                삭제
              </button> */}
            </SC.Slide>
          ))}
        </Slider>
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
        작성하기
      </SC.RegisterButton>
    </SC.StyledForm>
  );
};

export default PostForm;
