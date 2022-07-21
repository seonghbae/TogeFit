import { nanoid } from 'nanoid';
import * as SC from './CustomCardStyle';

type tagType = {
  tag: string;
  _id: string;
};

interface CustomCardProps {
  imgUrl: string;
  content: string;
  tagList: Array<tagType>;
  id: string;
  onClick: (articleId: string | undefined) => void;
}

const CustomCard = ({
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
      <SC.ArticleImg src={imgUrl} />
      <SC.Article>
        <SC.ArticleContent>{content}</SC.ArticleContent>
        <SC.TagContainer>
          {tagList.map((tagObject) => (
            <SC.Tag key={nanoid()}>{`#${tagObject.tag}`}</SC.Tag>
          ))}
        </SC.TagContainer>
      </SC.Article>
    </SC.Wrapper>
  );
};

export default CustomCard;
