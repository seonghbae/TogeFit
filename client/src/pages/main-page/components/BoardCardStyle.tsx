import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  :hover {
    background-color: rgba(255, 255, 255, 0.726);
  }
  cursor: pointer;
`;

export const ArticleImg = styled.img`
  width: 50%;
  object-fit: cover;
  border-radius: 5px;
  aspect-ratio: 1 / 1;
`;

export const Article = styled.article`
  display: flex;
  width: 50%;
  margin-left: 1rem;
  justify-content: space-around;
  flex-direction: column;
`;

export const ArticleContent = styled.h1`
  font-size: 2rem;
`;

export const TagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, auto));
  grid-gap: 10px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border: 1px solid ${(props) => props.theme.pointColors.lightGreen};
  border-radius: 25px;
  text-align: center;
`;
