import { useForm, SubmitHandler } from 'react-hook-form';
import * as SC from './style';

type Inputs = {
  searchData: string;
};

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('searchData')} />
      <input type="submit" value="검색" />
    </SC.StyledForm>
  );
};

export default SearchForm;
