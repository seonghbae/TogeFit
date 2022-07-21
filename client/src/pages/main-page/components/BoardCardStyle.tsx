import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  margin-bottom: 1rem;
  background-color: #fff;
  max-height: 50vh;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  :hover {
    background-color: rgba(255, 255, 255, 0.726);
  }
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  width: 90%;
`;

export const ArticleImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  aspect-ratio: 1 / 1;
`;

export const Article = styled.article`
  display: flex;
  width: 100%;
  margin-left: 1rem;
  justify-content: space-around;
  flex-direction: column;
  position: relative;
`;

export const AuthorContent = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  line-height: 140%;
  height: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

export const DateContent = styled.div`
  font-size: 0.8rem;
  line-height: 140%;
  height: auto;
  text-align: right;
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

export const LikeWrapper = styled.div`
  position: absolute;
  font-size: 1.5rem;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  span {
    margin-left: 1rem;
  }
  top: 0%;
  right: 0%;
`;

export const ArticleContent = styled.h1`
  font-size: 2rem;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 20vh;
`;

export const TagContainer = styled.div`
  /* height: 20vh; */
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, auto));
  grid-gap: 10px;
  overflow: hidden;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border: 1px solid ${(props) => props.theme.pointColors.lightGreen};
  border-radius: 25px;
  text-align: center;
`;
