import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselImg = styled.img`
  height: 100%;
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
  };

  return (
    <div>
      <Slider {...setting}>
        {imgUrl.map((url) => (
          <div key={Math.random()}>
            <img src={url} alt="article" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
