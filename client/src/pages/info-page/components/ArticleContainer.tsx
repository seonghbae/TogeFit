import getPath from 'common/utils/getPath';
import CustomCard from 'common/components/custom-card/CustomCard';
import Modal from 'common/components/alert-modal';
import { useState } from 'react';
import * as SC from './ArticleContainerStyle';
import MealDummyItem from './MealDummyItem';
import useArticle from '../hook/useArticle';

const ArticleContainer = () => {
  const path = getPath();
  const { articleList } = useArticle();

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
        {articleList.map(
          (article) =>
            path === 'exercise' && (
              <CustomCard
                key={`custom-card-${Math.random()}`}
                imgUrl={article.post_image[0]}
                content={article.contents}
                tagList={article.tag_list}
              />
            )
        )}
        {/* TODO: 식사 게시글 처리 */}
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
