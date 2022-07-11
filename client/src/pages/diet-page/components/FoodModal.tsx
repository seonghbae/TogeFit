/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */

const FoodModal = () => (
  <>
    <h3>음식 상세정보</h3>
    <div>
      <label htmlFor="name">이름</label>
      <input type="input" name="name" />
    </div>
    <div>
      <label htmlFor="quantity">양</label>
      <input type="input" name="quantity" />
    </div>
  </>
);

export default FoodModal;
