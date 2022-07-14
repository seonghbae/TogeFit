import { Routes, Route } from 'react-router-dom';
import DietInfo from './components/DietInfo';
import DietList from './components/DietList';
import AddMeal from './components/AddMeal';
import * as SC from './DietPageStyle';

const DietPage = () => (
  <SC.DietContainer>
    <Routes>
      <Route path="/" element={<DietList />} />
      <Route path=":id" element={<DietInfo />} />
      <Route path="add" element={<AddMeal />} />
    </Routes>
  </SC.DietContainer>
);

export default DietPage;
