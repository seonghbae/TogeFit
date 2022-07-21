/* eslint-disable react/no-array-index-key */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { useRecoilState } from 'recoil';
import ArrowButton from 'common/components/arrow-button/ArrowButton';
import { IDietList, IRoutines } from 'types/interfaces';
import dietState from 'pages/diet-page/states/dietState';
import routineState from '../states/routineState';

import * as SC from './PostCarouselStyle';

interface IResult {
  status: number;
  data: IRoutines;
}

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  data?: Array<string | number | null>;
  setData?: React.Dispatch<React.SetStateAction<Array<string | number | null>>>;
  /** 슬라이더 속도 */
  speed?: number;
  // draggable
  draggable?: boolean;
  width?: number;
  setModalView?: React.Dispatch<React.SetStateAction<boolean>>;
  mealData?: IDietList;
  routineData?: IResult;
}

const CustomCarousel = ({
  data = [],
  setData,
  speed = 500,
  draggable = false,
  width = 80,
  setModalView,
  mealData,
  routineData,
}: sliderProps) => {
  const configureOnlyOneContent = (dataLength: number, showCount: number) =>
    dataLength < showCount ? dataLength : showCount;
  const settings = {
    dots: true,
    infinite: draggable,
    speed,
    slidesToShow: configureOnlyOneContent(data.length, 5),
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: true,
    draggable: false,
    nextArrow: <ArrowButton className="arrow-button" />,
    prevArrow: <ArrowButton className="arrow-button" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: configureOnlyOneContent(data.length, 4),
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: configureOnlyOneContent(data.length, 3),
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: configureOnlyOneContent(data.length, 2),
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [food, setFood] = useRecoilState(dietState);
  const [routine, setRoutine] = useRecoilState(routineState);

  const handleClick = (item: string | number | null) => {
    if (mealData) {
      const selectMeal = mealData.data.find((mealItem) => {
        const date = new Date(mealItem.createdAt);
        if (item === `${date.getMonth() + 1}/${date.getDate()}`) {
          return true;
        }
        return false;
      });
      if (selectMeal !== undefined) {
        setFood(selectMeal);
      }
    } else if (routineData) {
      const selectRoutine = routineData.data.routines.find(
        (routineItem) => routineItem.routine_name === item
      );
      if (selectRoutine !== undefined) {
        // setRoutine(selectRoutine);
      }
    }
    if (setModalView) setModalView(true);
  };

  return (
    <SC.Wrapper width={width} className="CustomCarousel">
      <Slider {...settings}>
        {data.map((item, i) => (
          <SC.Slide
            key={i}
            data-index={i}
            className="slide-element"
            onClick={() => handleClick(item)}
          >
            <h3>{item}</h3>
          </SC.Slide>
        ))}
      </Slider>
    </SC.Wrapper>
  );
};

export default CustomCarousel;
