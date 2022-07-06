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
}

const CustomCarousel = ({
  data,
  className = 'test',
  autoplay = true,
  speed = 500,
  loop = false,
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      dots: false,
      infinite: false,
      speed,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [autoplay, loop, speed]
  );
  return (
    <Wrapper>
      <Slider {...settings}>
        {data.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <Slide>
            <h3>{item}</h3>
          </Slide>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CustomCarousel;
