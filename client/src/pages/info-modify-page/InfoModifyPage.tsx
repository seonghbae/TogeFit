import * as SC from './InfoModifyPageStyle';
import RegisterForm from './components/InfoModifyPageForm';

const InfoModifyPage: React.FC = () => {
  console.log('test');
  return (
    <SC.Wrapper>
      <div>
        <RegisterForm />
      </div>
    </SC.Wrapper>
  );
};

export default InfoModifyPage;
