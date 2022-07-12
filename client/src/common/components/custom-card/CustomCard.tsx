import * as SC from './CustomCardStyle';

type tagType = {
  tag: string;
  _id: string;
};

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tagList: Array<tagType>;
}

const CustomCard = ({ imgUrl, content, tagList }: CustomCardProps) => (
  <SC.Wrapper>
    <SC.ArticleImg src={imgUrl} />
    <SC.Article>
      <SC.ArticleContent>{content}</SC.ArticleContent>
      <SC.TagContainer>
        {tagList.map((tagObject) => (
          <SC.Tag key={Math.random()}>{`#${tagObject.tag}`}</SC.Tag>
        ))}
      </SC.TagContainer>
    </SC.Article>
  </SC.Wrapper>
);

export default CustomCard;
