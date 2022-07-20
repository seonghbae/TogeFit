import { IDiet } from 'types/interfaces';
import * as SC from './style';

interface MealModalProps {
  post: IDiet | undefined;
}

const MealModal = ({ post }: MealModalProps) => {
  console.log(post);

  return (
    <SC.Wrapper>
      <SC.Modal>MealModal!</SC.Modal>
    </SC.Wrapper>
  );
};

export default MealModal;
