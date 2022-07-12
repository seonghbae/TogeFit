import { FormInputType } from 'types/interfaces';
import CustomForm from './CustomForm';
import { LoginButton, LoadingDiv, ErrorMessage } from './LoginFormStyle';
import useLogin from '../hook/useLogin';

const LoginForm: React.FC = () => {
  const { asyncLogin, error, isLoading, showError } = useLogin();

  const onSubmit = async (data: FormInputType) => {
    asyncLogin(data);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <LoginButton type="submit">Login</LoginButton>
      {showError && <ErrorMessage>{error}</ErrorMessage>}
    </CustomForm>
  );
};

export default LoginForm;
