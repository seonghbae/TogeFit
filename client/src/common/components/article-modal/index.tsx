import { PostResponse } from 'types/interfaces';
import { MutableRefObject, useRef } from 'react';
import * as SC from './style';

interface ArticleProps {
  post: PostResponse | undefined;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type ClickEvent =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>;

const ArticleModal = ({ post, closeModal }: ArticleProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleClose = (e: ClickEvent) => {
    if (wrapperRef.current === e.target || e.target instanceof SVGSVGElement) {
      closeModal(false);
    }
  };

  return (
    <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
      {!post ? (
        <SC.Modal>게시글이 존재하지 않습니다!</SC.Modal>
      ) : (
        <SC.Modal>
          <SC.CloseIcon onClick={handleClose} />
          <SC.ArticleImg src={post.post_image[0]} />
          <SC.Article>
            <SC.ArticleContent>{post.contents}</SC.ArticleContent>
            <SC.TagContainer>
              {post.tag_list.map((tagObject) => (
                <SC.Tag key={Math.random()}>{`#${tagObject.tag}`}</SC.Tag>
              ))}
            </SC.TagContainer>
            {/* 아래 댓글 연결 필요 */}
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
