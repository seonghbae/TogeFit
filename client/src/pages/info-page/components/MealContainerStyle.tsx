import styled, { css } from 'styled-components';

export const ContainerSection = styled.section<{ isGrid: boolean }>`
  width: 70%;
  border-radius: 4rem;
  padding: 2rem;
  margin-bottom: 100px;
  text-align: center;

  ${(props) =>
    props.isGrid &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      grid-gap: 1rem;
    `}
`;
