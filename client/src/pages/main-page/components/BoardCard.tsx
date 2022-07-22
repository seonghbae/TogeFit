/* eslint-disable react/no-array-index-key */
import { HeartFill } from 'styled-icons/bootstrap';
import { useNavigate } from 'react-router-dom';

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
  updateAt: string;
  author: string;
  like: number;
  userId: string;
}

const BoardCard = ({
  imgUrl,
  content,
  tagList,
  id,
  onClick,
  author,
  updateAt,
  like,
  userId,
}: CustomCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(id);
  };

  const navigateInfo = () => {
    navigate(`/info/exercise/${userId}`);
  };

  return (
    <SC.Wrapper onClick={handleClick}>
      {imgUrl ? (
        <SC.ImgContainer>
          <SC.ArticleImg src={imgUrl} />
        </SC.ImgContainer>
      ) : (
        ''
      )}

      <SC.Article>
        <SC.AuthorContent>
          <button type="button" onClick={navigateInfo}>
            {author}
          </button>
          <SC.DateContent>{updateAt.slice(0, 10)}</SC.DateContent>
        </SC.AuthorContent>
        <SC.ArticleContent>{content}</SC.ArticleContent>
        <SC.LikeWrapper>
          <HeartFill color="red" width="2rem" />
          <span>{like}</span>
        </SC.LikeWrapper>
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
