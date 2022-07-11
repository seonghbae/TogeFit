import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 350px;
  border: 1px solid #000;
  justify-content: space-evenly;
  align-items: center;
`;

export const ArticleImg = styled.img`
  width: 250px;
  height: 250px;
`;

export const Article = styled.article`
  display: flex;
  height: 100%;
  justify-content: space-around;
  flex-direction: column;
`;

export const ArticleContent = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

export const TagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border: 1px solid #000;
  border-radius: 25px;
  text-align: center;
`;
