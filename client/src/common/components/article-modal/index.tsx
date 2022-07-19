import { PostResponse } from 'types/interfaces';
import * as SC from './style';

interface ArticleProps {
  post: PostResponse | undefined;
}

const ArticleModal = ({ post }: ArticleProps) => {
  const a = 10;

  return (
    <SC.Wrapper>
      {!post ? (
        <SC.Modal>게시글이 존재하지 않습니다!</SC.Modal>
      ) : (
        <SC.Modal>
          <SC.CloseIcon />
          <SC.ArticleImg src="https://team-16-s3.s3.ap-northeast-2.amazonaws.com/mREP5nAR9.jpeg" />
          <SC.Article>
            <SC.ArticleContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sed
              non, dolores similique corporis a id perspiciatis iure obcaecati
              atque ducimus corrupti, facilis, iste sunt ratione optio molestias
              aliquid consequuntur.
            </SC.ArticleContent>
            <SC.TagContainer>
              <SC.Tag>#lorem10</SC.Tag>
              <SC.Tag>#lorem11</SC.Tag>
              <SC.Tag>#lorem12</SC.Tag>
            </SC.TagContainer>
            <SC.CommentContainer>
              <h3>Comments</h3>
              <li>안녕하세요!</li>
              <li>안녕하세요!</li>
              <li>안녕하세요!</li>
            </SC.CommentContainer>
          </SC.Article>
        </SC.Modal>
      )}
    </SC.Wrapper>
  );
};

export default ArticleModal;
