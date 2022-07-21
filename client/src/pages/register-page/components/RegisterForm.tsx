/* eslint-disable jsx-a11y/label-has-associated-control */
import Modal from 'common/components/alert-modal';
import Loading from 'common/components/loading';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterInputType } from 'types/interfaces';

import useRegister from '../hook/useRegister';

import * as SC from './RegisterFormStyle';

const RegisterForm: React.FC = () => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const {
    registerRequest,
    isSend,
    isLoading,
    isShowError,
    error,
    isSuccess,
    setShowError,
  } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputType>({ mode: 'onChange' });

  const onSubmit = (data: RegisterInputType) => {
    registerRequest(data);
  };

  return (
    <>
      <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">
            ID<span>*</span>
          </label>
          <input
            id="id"
            type="text"
            placeholder="필수 입력 항목"
            {...register('userId', {
              required: true,
              maxLength: 20,
            })}
          />
          {errors.userId && errors.userId.type === 'required' && (
            <p>아이디를 입력해주세요.</p>
          )}
          {errors.userId && errors.userId.type === 'pattern' && (
            <p>올바른 아이디가 아닙니다.</p>
          )}
          {errors.userId && errors.userId.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>
        <div>
          <label htmlFor="password">
            Password<span>*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="필수 입력 항목"
            {...register('password', {
              required: true,
              maxLength: 20,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p>비밀번호를 입력해주세요.</p>
          )}
          {errors.password && errors.password.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>

        <div>
          <label htmlFor="password_check">
            Password Check<span>*</span>
          </label>
          <input
            id="password_check"
            type="password"
            placeholder="필수 입력 항목"
            {...register('password_check', {
              validate: (value) => value === watch('password'),
              required: true,
              maxLength: 20,
            })}
          />
          {errors.password_check &&
            errors.password_check.type === 'validate' && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
          {errors.password_check &&
            errors.password_check.type === 'required' && (
              <p>비밀번호를 확인해주세요.</p>
            )}
        </div>
        <div>
          <label htmlFor="name">
            이름<span>*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="필수 입력 항목"
            {...register('name', {
              required: true,
              maxLength: 20,
            })}
          />
          {errors.name && errors.name.type === 'required' && (
            <p>이름을 입력해주세요.</p>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>
        <div>
          <label htmlFor="nickName">
            닉네임<span>*</span>
          </label>
          <input
            id="nickName"
            type="text"
            placeholder="필수 입력 항목"
            {...register('nickname', { required: true, maxLength: 20 })}
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <p>닉네임을 입력해주세요.</p>
          )}
          {errors.nickname && errors.nickname.type === 'maxLength' && (
            <p>20자 이하로 설정해주세요.</p>
          )}
        </div>

        {isShowError && <p>{error?.reason}</p>}
        <SC.RegisterButton type="submit" isDisabled={isSend} ref={buttonRef}>
          {!isSend ? '회원가입' : '이메일이 전송됐습니다.'}
        </SC.RegisterButton>
      </SC.StyledForm>
      {isLoading && <Loading />}
    </>
  );
};

export default RegisterForm;
