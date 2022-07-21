import styled from 'styled-components';

interface RegisterButtonProps {
  isDisabled: boolean;
}

export const RegisterButton = styled.button<RegisterButtonProps>`
  width: 100%;
  height: 2.6rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border: 3px solid ${(props) => props.theme.pointColors.orange};
  border-radius: 2.6rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.pointColors.orange};
    ${(props) => props.isDisabled && 'cursor: not-allowed'}
  }
`;

export const SuccessModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 26rem;
    height: 30%;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 3px 8px 10px 2px #2c2c2c;

    & span {
      font-size: 1.4rem;
    }

    & button {
      width: 14rem;
      height: 2.4rem;
      font-size: 1.2rem;
      text-align: center;
      color: #fff;
      opacity: 0.7;
      background-color: ${(props) => props.theme.pointColors.orange};
      border-radius: 2.4rem;
      transition: opacity 0.2s linear;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 26rem;
  min-width: 20rem;
  margin-bottom: 1.5rem;

  & h1 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 4rem;

    & > strong {
      color: ${(props) => props.theme.pointColors.green};
    }
  }

  & label,
  & input {
    display: block;
  }

  & label {
    margin-bottom: 0.9rem;
    font-size: 1.5rem;

    & > span {
      padding-left: 0.5rem;
      color: red;
      font-size: 1.1rem;
    }
  }

  & input {
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 3px solid gray;
    padding: 0.4rem 0.8rem;

    &:focus {
      border-bottom: 3px solid ${(props) => props.theme.pointColors.green};
    }
  }

  & > div {
    margin-bottom: 3.2rem;
  }

  & p {
    color: red;
    font-size: 1.2rem;
    border: 1rem 0;
  }
`;

export const WithdrawalButton = styled.button`
  width: 100%;
  height: 2.6rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin-bottom: 1.5rem;
  border: 3px solid red;
  border-radius: 2.6rem;
  font-size: 1.2rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #eb5353;
    color: #fff;
  }
`;
