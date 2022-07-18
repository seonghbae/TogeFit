import { FormInputType } from 'types/interfaces';
import { AlertModal } from 'common/components';
import Loading from 'common/components/loading';
import { useEffect } from 'react';
import { getUserId } from 'common/utils/getUserId';
import { useNavigate } from 'react-router-dom';
import CustomForm from './CustomForm';
import { LoginButton } from './LoginFormStyle';
import useLogin from '../hook/useLogin';

const LoginForm = () => {
  const { asyncLogin, error, isLoading, isError, setIsError } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data: FormInputType) => {
    asyncLogin(data);
  };

  const handleConfirm = () => {
    setIsError(false);
  };

  useEffect(() => {
    if (getUserId()) navigate('/');
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <CustomForm onSubmit={onSubmit}>
        <LoginButton type="submit">Login</LoginButton>
      </CustomForm>
      {isError && <AlertModal message={error} handleConfirm={handleConfirm} />}
    </>
  );
};

export default LoginForm;
