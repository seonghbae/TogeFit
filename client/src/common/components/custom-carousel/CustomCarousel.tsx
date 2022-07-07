/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { DragEvent, useMemo, useRef } from 'react';
import ArrowButton from 'common/components/arrow-button/ArrowButton';
import { Wrapper, Slide } from './style';

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
    if (setDragTarget) {
      setDragTarget(data[e.currentTarget.dataset.index]);
    }
  };

  const dragEnd = (e: any) => {
    e.currentTarget.style.display = 'block';
  };
  const drapDrop = (e: any) => {
    if (dragTarget === undefined) return;
    if (!setData) return;
    e.currentTarget.style.display = 'block';
    // eslint-disable-next-line no-shadow
    const { x, width } = e.currentTarget.getBoundingClientRect();

    const middlePointX = width / 2 + x;

    const dropTargetIndex = Number(e.currentTarget.dataset.index);
    if (e.clientX < middlePointX) {
      data.splice(dropTargetIndex, 0, dragTarget);
      setData([...data]);
    } else {
      data.splice(dropTargetIndex + 1, 0, dragTarget);
      setData([...data]);
    }
  };

  return (
    <Wrapper width={width}>
      <Slider {...settings} ref={slideRef}>
        {data.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <Slide
            data-index={i}
            draggable={draggable}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDrop={drapDrop}
          >
            <h3>{item}</h3>
          </Slide>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CustomCarousel;
