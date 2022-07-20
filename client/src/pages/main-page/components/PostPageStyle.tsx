import styled from 'styled-components';

export const AddPostContainer = styled.div`
  border: 1px solid;
  background-color: #fff;
  margin: 0 20%;
  height: 100vh;
  width: 90% input, textarea {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
`;

export const FormWrapper = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 60%;
  width: 100%;
  row-gap: 1.5rem;

  h2 {
    margin-top: 25rem;
    margin-bottom: 5rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  row-gap: 1rem;

  textarea {
    border: none;
    resize: none;
  }
`;

export const RadioBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
