/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */

const RoutineModal = () => (
  <>
    <h3>운동 상세정보</h3>
    <div>
      <label htmlFor="name">이름</label>
      <input type="input" name="name" />
    </div>
    <div>
      <label htmlFor="count">개수</label>
      <input type="input" name="count" />
    </div>
    <div>
      <label htmlFor="set">세트</label>
      <input type="input" name="set" />
    </div>
  </>
);

export default RoutineModal;
