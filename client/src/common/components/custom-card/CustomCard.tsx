import * as SC from './CustomCardStyle';

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tags: Array<string>;
}

const CustomCard = () => (
  <SC.Wrapper>
    <SC.ArticleImg src="https://team-16-s3.s3.ap-northeast-2.amazonaws.com/u99cT3fpd.jpeg" />
    <SC.Article>
      <SC.ArticleContent>날씨가 좋다~~!!!</SC.ArticleContent>
      <SC.TagContainer>
        <SC.Tag>#조깅</SC.Tag>
        <SC.Tag>#야외</SC.Tag>
      </SC.TagContainer>
    </SC.Article>
  </SC.Wrapper>
);

export default CustomCard;
