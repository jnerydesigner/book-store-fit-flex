import styled from "styled-components";

export const ContainerContent = styled.main`
  margin: 0 auto;
  width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  margin-top: 60px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
