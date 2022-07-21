import { useForm, SubmitHandler } from 'react-hook-form';

import * as SC from './style';

type Inputs = {
  searchData: string;
};
interface ISearchForm {
  searchFunc: (query: string) => void;
  placeholder?: string;
}
const SearchForm = (props: ISearchForm) => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();

  const { searchFunc, placeholder } = props;
  let timer: string | number | NodeJS.Timeout | undefined;
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => searchFunc(data.searchData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = e.target.value;

    clearTimeout(timer);
    timer = setTimeout(() => {
      searchFunc(searchData);
    }, 400);
  };
  return (
    <SC.StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('searchData')}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <input type="submit" value="검색" />
    </SC.StyledForm>
  );
};

export default SearchForm;
