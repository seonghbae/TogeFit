/* eslint-disable react/no-array-index-key */
import * as SC from './BoardCardStyle';

type tagType = {
  tag: string;
  _id: string;
};

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tagList: Array<tagType>;
  onClick: (articleId: string | undefined) => void;
  id: string;
}

const BoardCard = ({
  imgUrl,
  content,
  tagList,
  id,
  onClick,
}: CustomCardProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <SC.Wrapper onClick={handleClick}>
      {imgUrl ? <SC.ArticleImg src={imgUrl} /> : ''}

      <SC.Article>
        <SC.ArticleContent>{content}</SC.ArticleContent>
        <SC.TagContainer>
          {tagList.map((tagObject, i) => (
            <SC.Tag key={i}>{`#${tagObject.tag}`}</SC.Tag>
          ))}
        </SC.TagContainer>
      </SC.Article>
    </SC.Wrapper>
  );
};

export default BoardCard;
