import styled from "styled-components";

export const ContainerBookDetail = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.color.background};
`;

export const ContainerDetails = styled.div`
  margin: 0 auto;
  width: 1000px;

  display: grid;
  grid-template-columns: 660px 1fr;
  gap: 40px;
`;
export const ContainerColumnDetails = styled.div`
  h1 {
    text-align: justify;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 56px;
  }
  p {
    text-align: justify;
    font-size: 16px;
    line-height: 19px;
  }
`;
export const ContainerDetailsAuthorAndRelease = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  width: 100%;
  margin-bottom: 32px;
  p {
    font-size: 20px;
    line-height: 24px;
  }
`;

export const ContainerImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBook = styled.img`
  width: 100%;
`;
