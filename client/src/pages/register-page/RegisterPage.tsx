import * as SC from './RegisterPageStyle';
import RegisterForm from './components/RegisterForm';

const RegisterPage: React.FC = () => {
  console.log('test');
  return (
    <SC.Wrapper>
      <div>
        <RegisterForm />
      </div>
    </SC.Wrapper>
  );
};

export default RegisterPage;
