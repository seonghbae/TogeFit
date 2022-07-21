import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SearchForm } from '../../../common/components';
import useBoardList from '../hook/useBoardList';
import useSearchBoardList from '../hook/useSearchBoardList';
import { searchQueryState } from '../states';

// import useSearchExercise from '../hooks/useSearchExercise';
// import { exerciseState } from '../states';

import * as SC from './HeaderStyle';

const Header = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const handleAddBtn = () => {
    setIsOpen(true);
  };

  const searchFunc = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SC.HeaderWrapper>
      <SC.Search>
        <SearchForm searchFunc={searchFunc} placeholder="태그를 검색하세요!" />
      </SC.Search>
    </SC.HeaderWrapper>
  );
};

export default Header;
