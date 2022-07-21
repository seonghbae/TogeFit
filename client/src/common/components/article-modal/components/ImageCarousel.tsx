import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ArrowButton from 'common/components/arrow-button/ArrowButton';

const Wrapper = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: #fff;
  }
  img {
    object-fit: scale-down;
  }

  .slick-prev {
    left: 5px;
    z-index: 9999;
  }

  .slick-next {
    right: 5px;
    z-index: 9999;
  }
`;

interface CarouselProps {
  imgUrl: string[];
}

const ImageCarousel = ({ imgUrl }: CarouselProps) => {
  const setting = {
    dots: true,
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    draggable: true,
    nextArrow: <ArrowButton />,
    prevArrow: <ArrowButton />,
  };

  return (
    <Wrapper>
      <Slider {...setting}>
        {imgUrl.map((url) => (
          <div key={Math.random()}>
            <img src={url} alt="article" />
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default ImageCarousel;
