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
  width: 80%;
  max-width: 1200px;
  padding: 4rem 2rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 9999;
  height: auto;
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
  width: 80%;
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
  margin-right: 1rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const Article = styled.article`
  display: flex;
  flex-grow: 1;
  margin-left: 1rem;
  justify-content: center;
  flex-direction: column;
  height: auto;

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
  height: auto;
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
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-bottom: 3px solid gray;
  padding-right: 4rem;
  &:focus {
    border-bottom: 3px solid ${(props) => props.theme.pointColors.lightGreen};
  }
`;

export const DivideLine = styled.div`
  width: 100%;
  border: 0.2px solid rgba(0, 0, 0, 0.2);
`;

export const SubmitButton = styled.button`
  padding: 5px 10px;
  font-size: 1rem;
  position: absolute;
  min-width: 4rem;
  top: 0%;
  right: 0%;
`;

export const CommentWrapper = styled.div`
  padding-left: 0;
  margin-left: 0;
  overflow: scroll;
  height: auto;
  max-height: 20vh;
  border-top: 1px rgba(0, 0, 0, 0.1);
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  li:nth-child(2n) {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  li:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const CommentEleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const CommentAuthorWrapper = styled.p`
  font-size: 1.1rem;
  font-weight: 1000;
`;

export const CommentContent = styled.p`
  padding-left: 1rem;
  font-size: 1rem;
  width: 80%;
  word-break: break-all;
`;
export const CommentModiInput = styled.input`
  padding-left: 1rem;
  font-size: 1rem;
  width: 80%;
  word-break: break-all;
  border-bottom: 1px solid rgba(255, 255, 255);
  :focus {
    border-bottom: 1px solid rgba(0, 0, 0);
  }
`;

export const CommentButtonDiv = styled.div`
  display: flex;
  margin: 1rem 0;
  padding-left: 1rem;
  font-size: 1rem;
`;

export const CommentInputWrapper = styled.form`
  display: flex;
  position: relative;
`;

export const TagContainer = styled.div`
  font-size: 0.8rem;
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
