/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { RegisterInputType } from 'types/interfaces';
import { useForm } from 'react-hook-form';
import StyledForm from './CustomFormStyle';

interface FormProps {
  children?: React.ReactNode;
  onSubmit: (data: RegisterInputType) => void;
  header?: string;
  registerMode?: boolean;
  isDisabled?: boolean;
}

const CustomForm: React.FC<FormProps> = ({
  children,
  onSubmit,
  header,
  registerMode,
  isDisabled,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputType>({ mode: 'onChange' });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">
          ID<span>*</span>
        </label>
        <input
          id="id"
          type="text"
          placeholder="필수 입력 항목"
          disabled={isDisabled}
          {...register('id', {
            required: true,
          })}
        />
        {errors.id && errors.id.type === 'required' && (
          <p>아이디를 입력해주세요.</p>
        )}
        {errors.id && errors.id.type === 'pattern' && (
          <p>올바른 아이디가 아닙니다.</p>
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
          disabled={isDisabled}
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>비밀번호를 입력해주세요.</p>
        )}
      </div>
      {registerMode && (
        <>
          <div>
            <label htmlFor="nickName">
              Password Check<span>*</span>
            </label>
            <input
              id="password_check"
              type="password"
              {...register('password_check', {
                validate: (value) => value === watch('password'),
              })}
              disabled={isDisabled}
            />
            {errors.password_check &&
              errors.password_check.type === 'validate' && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}
          </div>
          <div>
            <label htmlFor="nickName">닉네임</label>
            <input
              id="nickName"
              type="text"
              {...register('nickName')}
              placeholder="미 입력시 랜덤으로 주어집니다."
              disabled={isDisabled}
            />
          </div>
        </>
      )}
      {children}
    </StyledForm>
  );
};

export default CustomForm;
