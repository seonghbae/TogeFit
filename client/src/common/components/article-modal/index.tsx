/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { nanoid } from 'nanoid';

import isPostUpdateState from 'recoil/isPostUpdateState';
import postState from 'recoil/postState';
import { Pencil, Trash } from 'styled-icons/boxicons-solid';
import { CheckmarkOutline } from 'styled-icons/evaicons-outline';
import { HeartFill, Heart } from 'styled-icons/bootstrap';
import { Cross } from 'styled-icons/entypo';

import { PostResponse, ModalCloseEvent } from 'types/interfaces';
import { getUserId } from 'common/utils/getUserId';
import { customAxios } from 'common/api';
import ImageCarousel from './components/ImageCarousel';
import RoutineList from './components/RoutineList';
import MealList from './components/MealList';
import useComment from './hooks/useComment';
import usePostDelete from './hooks/usePostDelete';

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
  const { deletePost } = usePostDelete();
  const [isPostUpdate, setIsPostUpdate] = useRecoilState(isPostUpdateState);
  const [postItem, setPostItem] = useRecoilState(postState);
  const userId = getUserId();
  const navigate = useNavigate();
  const [commentModiTarget, setCommentModiTarget] = useState('');
  const [modiComment, setModiComment] = useState('');
  const localUserId = useMemo(() => getUserId(), []);
  const [isLike, setIsLike] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ content: string }>();

  const handleUpdate = () => {
    setIsPostUpdate(true);
    if (post !== undefined) {
      setPostItem(post);
    }
    modalState(false);
    navigate('/board-modify');
  };

  const handleDelete = () => {
    deletePost({ postId: post?._id });
    modalState(false);
    window.location.reload();
  };

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

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);

    return `${date.getFullYear()}-${String(date.getMonth()).padStart(
      2,
      '0'
    )}-${String(date.getDay()).padStart(2, '0')} ${String(
      date.getHours()
    ).padStart(2, '0')}:${date.getMinutes()}`;
  };

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  const handleLikeBtn = (id: string) => {
    setIsLike((cur) => !cur);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      customAxios.post('/api/post/like', { postId: id });
    }, 500);

    setDebounceTimer(newTimer);
  };

  const isSearchRoutine = () => {
    if (post) {
      return post.routine_info.filter((item) => item._id === post.routine);
    }
  };

  useEffect(() => {
    if (post?._id) {
      customAxios
        .get(`/api/post/liked?userId=${localUserId}&postId=${post?._id}`)
        .then((res) => setIsLike(res.data));
    }
  }, [post]);

  const navigateInfo = () => {
    navigate(`/info/exercise/${post?.userId}`);
  };

  return (
    <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
      {!post ? (
        <SC.Modal>게시글이 존재하지 않습니다!</SC.Modal>
      ) : (
        <SC.Modal>
          {userId === post.userId && (
            <SC.ButtonContainer>
              <button type="button" onClick={handleUpdate}>
                수정
              </button>
              <button type="button" onClick={handleDelete}>
                삭제
              </button>
            </SC.ButtonContainer>
          )}
          <SC.CloseIcon className="close-area" onClick={handleClose} />
          {post.post_image.length !== 0 ? (
            <SC.CarouselContainer>
              <ImageCarousel imgUrl={post.post_image} />
            </SC.CarouselContainer>
          ) : (
            ''
          )}
          <SC.Article>
            <SC.AuthorContent onClick={navigateInfo}>
              {post.nickname}
            </SC.AuthorContent>
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
                <RoutineList routineList={isSearchRoutine() || []} />
              </>
            )}
            <SC.CommentContainer>
              <SC.HeaderWrapper>
                <button type="button" onClick={() => handleLikeBtn(post._id)}>
                  {isLike ? (
                    <HeartFill size="2rem" color="red" />
                  ) : (
                    <Heart size="2rem" color="red" />
                  )}
                </button>
              </SC.HeaderWrapper>
              <SC.CommentInputWrapper onSubmit={handleSubmit(onSubmit)}>
                <SC.CommentInput
                  placeholder="댓글을 입력하세요."
                  type="text"
                  {...register('content', { required: true, maxLength: 400 })}
                />
                <SC.SubmitButton type="submit">입력</SC.SubmitButton>
              </SC.CommentInputWrapper>
              <SC.CommentWrapper>
                {post.comments
                  .slice(0)
                  .reverse()
                  .map((comment, i) => (
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
                          <SC.CommentContent>
                            {comment.content}
                          </SC.CommentContent>
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
                              <SC.CommentDateWrapper>
                                {parseDate(comment.updatedAt)}
                              </SC.CommentDateWrapper>
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
                        ) : (
                          <SC.CommentDateWrapper>
                            {comment.updatedAt
                              .replace(/\..*$/, '')
                              .replace(/[T]/g, ' ')}
                          </SC.CommentDateWrapper>
                        )}
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
