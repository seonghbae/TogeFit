import getPath from 'common/utils/getPath';
import Modal from 'common/components/alert-modal';
import { useState } from 'react';
import * as SC from './ArticleContainerStyle';
import ExerciseDummyItem from './ExerciseDummyItem';
import MealDummyItem from './MealDummyItem';

const ArticleContainer = () => {
  const path = getPath();

  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    console.log('confirm');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SC.ContainerSection>
        {Array(8)
          .fill(0)
          .map(
            () =>
              path === 'exercise' && (
                <ExerciseDummyItem key={`dummy-item-${Math.random()}`} />
              )
          )}
        {Array(8)
          .fill(0)
          .map(
            () =>
              path === 'meal' && (
                <MealDummyItem key={`dummy-item-${Math.random()}`} />
              )
          )}
      </SC.ContainerSection>
      {isOpen && (
        <Modal
          message="Test Message!"
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ArticleContainer;
