import * as SC from './CustomCardStyle';

type tagType = {
  tag: string;
  _id: string;
};

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tagList: Array<tagType>;
  onClick: () => void;
}

const CustomCard = ({ imgUrl, content, tagList, onClick }: CustomCardProps) => (
  <SC.Wrapper onClick={onClick}>
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
