import styled from 'styled-components';
import { Close } from 'styled-icons/material-rounded';

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9998;
`;

export const Modal = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  max-width: 1200px;
  height: 70%;
  padding: 1rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 9999;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 3rem 1rem;
  }
`;

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 3%;
  right: 3%;
  width: 1.8rem;
  cursor: pointer;
`;

export const ArticleImg = styled.img`
  width: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-top: 1rem;
  }
`;

export const CarouselContainer = styled.div`
  display: inline-block;
  width: 50%;
  margin: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const Article = styled.article`
  display: flex;
  width: 50%;
  margin-left: 1rem;
  justify-content: center;
  flex-direction: column;

  & > div + div {
    margin-top: 2rem;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

export const ArticleContent = styled.div`
  font-size: 1.2rem;
  line-height: 140%;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

export const CommentContainer = styled.div`
  & > li + li {
    margin-top: 10px;
  }
`;

export const CommentInput = styled.input`
  width: 100%;
  margin-top: 2rem;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-bottom: 3px solid gray;

  &:focus {
    border-bottom: 3px solid ${(props) => props.theme.pointColors.lightGreen};
  }
`;

export const DivideLine = styled.div`
  width: 100%;
  border: 0.2px solid #000;
`;

export const SubmitButton = styled.button`
  padding: 5px 10px;
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.pointColors.lightGreen};
  border-radius: 20px;
  font-size: 1.1rem;
`;

export const TagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, auto));
  grid-gap: 10px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border: 1px solid ${(props) => props.theme.pointColors.lightGreen};
  border-radius: 25px;
  text-align: center;
`;
