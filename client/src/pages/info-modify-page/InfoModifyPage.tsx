import * as SC from './InfoModifyPageStyle';
import InfoModifyPageForm from './components/InfoModifyPageForm';

const InfoModifyPage: React.FC = () => {
  console.log('test');
  return (
    <SC.Wrapper>
      <div>
        <InfoModifyPageForm />
      </div>
    </SC.Wrapper>
  );
};

export default InfoModifyPage;
