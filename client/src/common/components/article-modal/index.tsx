/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { PostResponse, ModalCloseEvent } from 'types/interfaces';
import {
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { nanoid } from 'nanoid';

import { Pencil, Trash } from 'styled-icons/boxicons-solid';
import { CheckmarkOutline } from 'styled-icons/evaicons-outline';

import { Cross } from 'styled-icons/entypo';
import { getUserId } from 'common/utils/getUserId';
import { customAxios } from 'common/api';
import ImageCarousel from './components/ImageCarousel';
import RoutineList from './components/RoutineList';
import MealList from './components/MealList';
import useComment from './hooks/useComment';

import * as SC from './style';

interface ArticleProps {
  post: PostResponse | undefined;
  modalState: React.Dispatch<React.SetStateAction<boolean>>;
  articleId?: string;
  getArticle?: (id: string | undefined) => Promise<void>;
}

const ArticleModal = ({
  post,
  modalState,
  articleId,
  getArticle,
}: ArticleProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { addComment, result } = useComment();
  const [commentModiTarget, setCommentModiTarget] = useState('');
  const [modiComment, setModiComment] = useState('');
  const localUserId = useMemo(() => getUserId(), []);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ content: string }>();

  const handleClose = (e: ModalCloseEvent) => {
    if (
      e.currentTarget.closest('.close-area') ||
      wrapperRef.current === e.target
    ) {
      modalState(false);
    }
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const postData = {
      postId: articleId,
      content: data.content,
    };
    addComment(postData);
  };

  useEffect(() => {
    if (result?.status === 201 && getArticle) {
      getArticle(articleId);
      resetField('content');
    }
  }, [result]);

  const handleCommentModify = (id: string, content: string) => {
    setCommentModiTarget(id);
    setModiComment(content);
  };

  const handleCommentModifyConfirm = () => {
    const postData = {
      commentId: commentModiTarget,
      content: modiComment,
    };
    customAxios
      .patch('/api/post/comment/patch', postData)
      .then((res) => {
        if (res.status === 200 && getArticle) {
          setCommentModiTarget('');
          setModiComment('');
          getArticle(articleId);
        }
      })
      .catch((err) => alert(err));
  };

  const handleCommentModifyCancel = () => {
    setCommentModiTarget('');
    setModiComment('');
  };

  const handleCommentDelete = (id: string) => {
    const data = {
      commentId: id,
    };
    customAxios
      .delete('/api/post/comment', { data })
      .then((res) => {
        if (res.status === 200 && getArticle) {
          getArticle(articleId);
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
      {!post ? (
        <SC.Modal>게시글이 존재하지 않습니다!</SC.Modal>
      ) : (
        <SC.Modal>
          <SC.CloseIcon className="close-area" onClick={handleClose} />
          {post.post_image.length !== 0 ? (
            <SC.CarouselContainer>
              <ImageCarousel imgUrl={post.post_image} />
            </SC.CarouselContainer>
          ) : (
            ''
          )}
          <SC.Article>
            <SC.ArticleContent>{post.contents}</SC.ArticleContent>
            <SC.TagContainer>
              {post.tag_list.map((tagObject) => (
                <SC.Tag key={nanoid()}>{`#${tagObject.tag}`}</SC.Tag>
              ))}
            </SC.TagContainer>
            {post.meal_info.length !== 0 && (
              <>
                <SC.DivideLine />
                <MealList mealList={post.meal_info} />
              </>
            )}
            {post.routine_info.length !== 0 && (
              <>
                <SC.DivideLine />
                <RoutineList routineList={post.routine_info} />
              </>
            )}
            <SC.CommentContainer>
              <SC.CommentInputWrapper onSubmit={handleSubmit(onSubmit)}>
                <SC.CommentInput
                  placeholder="댓글을 입력하세요."
                  type="text"
                  {...register('content', { required: true, maxLength: 400 })}
                />
                <SC.SubmitButton type="submit">입력</SC.SubmitButton>
              </SC.CommentInputWrapper>
              <SC.CommentWrapper>
                {post.comments.map((comment, i) => (
                  <li key={comment._id}>
                    <SC.CommentEleWrapper
                      data-id={comment._id}
                      className="comment-div"
                    >
                      <SC.CommentAuthorWrapper>
                        {comment.author}
                      </SC.CommentAuthorWrapper>
                      {commentModiTarget === comment._id ? (
                        <SC.CommentModiInput
                          type="text"
                          value={modiComment}
                          onChange={(e) => setModiComment(e.target.value)}
                        />
                      ) : (
                        <SC.CommentContent>{comment.content}</SC.CommentContent>
                      )}

                      {comment.author === localUserId ? (
                        commentModiTarget === comment._id ? (
                          <SC.CommentButtonDiv>
                            <button
                              type="button"
                              onClick={() => handleCommentModifyConfirm()}
                            >
                              <CheckmarkOutline color="#000" width="1.4rem" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCommentModifyCancel()}
                            >
                              <Cross color="#000" width="1.4rem" />
                            </button>
                          </SC.CommentButtonDiv>
                        ) : (
                          <SC.CommentButtonDiv>
                            <button
                              type="button"
                              onClick={() =>
                                handleCommentModify(
                                  comment._id,
                                  comment.content
                                )
                              }
                            >
                              <Pencil color="#000" width="1.4rem" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCommentDelete(comment._id)}
                            >
                              <Trash color="#000" width="1.4rem" />
                            </button>
                          </SC.CommentButtonDiv>
                        )
                      ) : null}
                    </SC.CommentEleWrapper>
                  </li>
                ))}
              </SC.CommentWrapper>
            </SC.CommentContainer>
          </SC.Article>
        </SC.Modal>
      )}
    </SC.Wrapper>
  );
};

export default ArticleModal;
