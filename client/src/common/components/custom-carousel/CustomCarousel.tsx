/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import ArrowButton from 'common/components/arrow-button/ArrowButton';
import { ROUTINE_INITIAL_MESSAGE } from 'common/constants';
import { usePrevious } from 'common/hooks';
import {
  getMiddlePointX,
  isCursorLeftX,
} from 'common/utils/getElementLocationInfo';
import * as SC from './style';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  data: Array<string | number | null>;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
  // draggable
  draggable?: boolean;

  width?: number;
  dragTarget?: string | number | null;
  setDragTarget?: React.Dispatch<React.SetStateAction<string | number | null>>;
  setData?: React.Dispatch<React.SetStateAction<Array<string | number | null>>>;
  modifyFlag?: boolean;
  setModalView?: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel?: boolean;
  setIsCancel?: React.Dispatch<React.SetStateAction<boolean>>;
  cache?: Array<string | number | null>;
  setCache?: React.Dispatch<
    React.SetStateAction<Array<string | number | null>>
  >;
}

const CustomCarousel = ({
  data,
  className = 'test',
  autoplay = true,
  speed = 500,
  loop = false,
  draggable = false,
  width = 80,
  dragTarget,
  setDragTarget,
  setData,
  modifyFlag = false,
  setModalView,
  isCancel,
  setIsCancel,
  setCache,
  cache,
}: sliderProps) => {
  const configureOnlyOneContent = (dataLength: number, showCount: number) =>
    dataLength < showCount ? dataLength : showCount;
  const slideRef = useRef(null);
  const settings = {
    dots: true,
    infinite: draggable,
    speed,
    slidesToShow: configureOnlyOneContent(data.length, 5),
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: draggable,
    draggable: !draggable,
    nextArrow: <ArrowButton />,
    prevArrow: <ArrowButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: configureOnlyOneContent(data.length, 4),
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: configureOnlyOneContent(data.length, 3),
          slidesToScroll: 2,
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

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
  };
  const dragStart = (e: any) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragTarget);
    if (modifyFlag) return;

    if (setDragTarget) {
      setDragTarget(data[e.currentTarget.dataset.index]);
    }
  };

  const dragEnd = (e: any) => {
    e.currentTarget.style.display = 'block';
  };
  const dragDrop = (e: any) => {
    if (!dragTarget || !setData || !modifyFlag) return;

    const cachedData = data;
    const dropTargetIndex = Number(e.currentTarget.dataset.index);
    const isInitial = data[dropTargetIndex] === ROUTINE_INITIAL_MESSAGE;

    if (setCache) setCache([...cachedData]);

    if (isInitial) {
      data.splice(dropTargetIndex, 1, dragTarget);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isCursorLeftX(e)) {
        data.splice(dropTargetIndex, 0, dragTarget);
      } else {
        data.splice(dropTargetIndex + 1, 0, dragTarget);
      }
    }

    setData([...data]);

    if (setDragTarget) setDragTarget(null);
    if (setModalView) setModalView(true);
  };

  return (
    <SC.Wrapper width={width} className="CustomCarousel">
      <Slider {...settings} ref={slideRef}>
        {data.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <SC.Slide
            key={Math.random()}
            data-index={i}
            draggable={draggable}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDrop={dragDrop}
          >
            <h3>{item}</h3>
          </SC.Slide>
        ))}
      </Slider>
    </SC.Wrapper>
  );
};

export default CustomCarousel;
