/* eslint-disable jsx-a11y/label-has-associated-control */
import Modal from 'common/components/alert-modal';
import Loading from 'common/components/loading';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUserInfoModify, RegisterInputType } from 'types/interfaces';

import useModify from '../hook/useModify';

import * as SC from './InfoModifyPageFormStyle';

const RegisterForm: React.FC = () => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const {
    modifyRequest,
    isSend,
    isLoading,
    isShowError,
    error,
    isSuccess,
    setShowError,
  } = useModify();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInfoModify>({ mode: 'onChange' });

  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (data: IUserInfoModify) => {
    const formData = new FormData();

    formData.append('profile_image', data.profile_image[0]);
    formData.append('name', data.name);
    formData.append('nickname', data.nickname);
    formData.append('currentPassword', data.currentPassword);
    formData.append('password', data.password);

    modifyRequest(formData);
    setIsSubmit(true);
  };

  const handleConfirm = () => {
    setIsSubmit(true);
  };
  const handleCancel = () => {
    setIsSubmit(false);
  };

  return (
    <>
      <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="profile_image">프로필 사진</label>
          <input
            id="profile_image"
            type="file"
            accept="image/*"
            {...register('profile_image')}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              maxLength: 20,
            })}
          />
          {errors.password && errors.password.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>

        <div>
          <label htmlFor="password_check">Password Check</label>
          <input
            id="password_check"
            type="password"
            {...register('password_check', {
              validate: (value) => value === watch('password'),
              maxLength: 20,
            })}
          />
          {errors.password_check &&
            errors.password_check.type === 'validate' && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            {...register('name', {
              maxLength: 20,
            })}
          />
          {errors.name && errors.name.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>
        <div>
          <label htmlFor="nickName">닉네임</label>
          <input
            id="nickName"
            type="text"
            {...register('nickname', { maxLength: 20 })}
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <p>닉네임을 입력해주세요.</p>
          )}
          {errors.nickname && errors.nickname.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>

        {isSubmit && (
          <Modal
            message=""
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
          >
            <label htmlFor="nickName">Password</label>
            <input
              id="currentPassword"
              type="password"
              {...register('currentPassword', { required: true })}
            />
            {errors.nickname && errors.nickname.type === 'required' && (
              <p>비밀번호를 입력해주세요.</p>
            )}
          </Modal>
        )}

        {isShowError && <p>{error?.reason}</p>}
        <SC.RegisterButton
          type="button"
          isDisabled={isSend}
          ref={buttonRef}
          onClick={handleConfirm}
        >
          수정하기
        </SC.RegisterButton>
      </SC.StyledForm>
      {isLoading && <Loading />}
    </>
  );
};

export default RegisterForm;
