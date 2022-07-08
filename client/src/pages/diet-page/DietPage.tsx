import { Routes, Route } from 'react-router-dom';
import DietInfo from './components/DietInfo';
import AddMeal from './components/AddMeal';
import DietContainer from './DietPageStyle';

const DietPage = () => (
  <DietContainer>
    <Routes>
      <Route path="/*" element={<DietInfo />} />
      <Route path="add" element={<AddMeal />} />
    </Routes>
  </DietContainer>
);

export default DietPage;
