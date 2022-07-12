import { useState } from 'react';
import { SearchForm } from '../../../common/components';

import AddExerciseModal from './AddExerciseModal';
// import AddExerciseModal from './AddExerciseModal';
import * as SC from './HeaderStyle';

const Header = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddBtn = () => {
    setIsOpen(true);
  };

  return (
    <SC.HeaderWrapper>
      <h1>내 루틴 만들기</h1>
      {/* <SearchForm /> */}
      <button type="button" onClick={handleAddBtn}>
        +
      </button>
      <AddExerciseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCancel={isCancel}
        setIsCancel={setIsCancel}
      />
    </SC.HeaderWrapper>
  );
};

export default Header;
