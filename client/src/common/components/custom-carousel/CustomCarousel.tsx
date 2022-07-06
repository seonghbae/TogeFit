/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMemo } from 'react';
import { Wrapper, Slide } from './style';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  data: Array<string | number>;
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
}

const SampleNextArrow = (props: {
  className?: any;
  style?: any;
  onClick?: any;
}) => {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onKeyUp={onClick}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: {
  className?: any;
  style?: any;
  onClick?: any;
}) => {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
      onKeyUp={onClick}
    />
  );
};

const CustomCarousel = ({
  data,
  className = 'test',
  autoplay = true,
  speed = 500,
  loop = false,
  draggable = false,
  width = 80,
}: sliderProps) => {
  const configureOnlyOneContent = (dataLength: number, showCount: number) =>
    dataLength < showCount ? dataLength : showCount;

  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: draggable,
      speed,
      slidesToShow: configureOnlyOneContent(data.length, 5),
      slidesToScroll: 2,
      initialSlide: 0,
      arrows: draggable,
      draggable: !draggable,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: configureOnlyOneContent(data.length, 4),
            slidesToScroll: 1,
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
    }),
    [autoplay, loop, speed]
  );
  return (
    <Wrapper width={width}>
      <Slider {...settings}>
        {data.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <Slide draggable={draggable}>
            <h3>{item}</h3>
          </Slide>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CustomCarousel;
