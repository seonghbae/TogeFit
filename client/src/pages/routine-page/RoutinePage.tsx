import { SearchForm, CustomCarousel } from '../../common/components';

const RoutinePage = () => (
  <div>
    routine
    <SearchForm />
    <CustomCarousel data={[1, 2, 3, 4, 5]} />
  </div>
);

export default RoutinePage;
