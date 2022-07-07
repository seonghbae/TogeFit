import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid black;
  background-color: #fff;
  margin-left: 5%;
  margin-right: 5%;
  height: 100vh;
`;

const MealWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'name name name'
    'meal meal calorie';

  margin-left: 5%;
  margin-right: 5%;

  & > ol {
    border: 1px solid black;
    margin: 0;
    grid-area: meal;
  }

  & > p {
    border: 1px solid black;
    grid-area: name;
  }
`;

export { Wrapper, MealWrapper };
