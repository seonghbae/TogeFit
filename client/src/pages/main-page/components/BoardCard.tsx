import * as SC from './BoardCardStyle';

type tagType = {
  tag: string;
  _id: string;
};

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tagList: Array<tagType>;
}

const BoardCard = ({ imgUrl, content, tagList }: CustomCardProps) => (
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

export default BoardCard;
