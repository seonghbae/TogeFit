import { useForm, SubmitHandler } from 'react-hook-form';

import * as SC from './style';

type Inputs = {
  searchData: string;
};
interface ISearchForm {
  searchFunc: (query: string) => void;
}
const SearchForm = (props: ISearchForm) => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();

  const { searchFunc } = props;
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => searchFunc(data.searchData);

  return (
    <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('searchData')} />
      <input type="submit" value="검색" />
    </SC.StyledForm>
  );
};

export default SearchForm;
