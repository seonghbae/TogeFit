import * as SC from './CustomCardStyle';

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tagList: Array<string>;
}

const CustomCard = ({ imgUrl, content, tagList }: CustomCardProps) => (
  <SC.Wrapper>
    <SC.ArticleImg src={imgUrl} />
    <SC.Article>
      <SC.ArticleContent>{content}</SC.ArticleContent>
      <SC.TagContainer>
        {tagList.map((tag) => (
          <SC.Tag key={Math.random()}>{tag}</SC.Tag>
        ))}
      </SC.TagContainer>
    </SC.Article>
  </SC.Wrapper>
);

export default CustomCard;
