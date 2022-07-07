import styled from 'styled-components';

const Wrapper = styled.form`
  border: 1px solid red;

  & > ol {
    border: 1px solid red;
  }
`;

export default Wrapper;
