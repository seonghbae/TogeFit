import { useForm, SubmitHandler } from 'react-hook-form';
import StyledForm from './style';

type Inputs = {
  searchData: string;
};

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('searchData')} />
      <input type="submit" value="검색" />
    </StyledForm>
  );
};
export default SearchForm;
