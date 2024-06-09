import styled from "styled-components";

export const ContainerCard = styled.div`
  display: grid;
  grid-template-rows: 212px 268px;
  box-shadow: 0px 1px 17px -4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 1px 17px -4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 17px -4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }
`;

export const ContainerCardImage = styled.div`
  display: flex;
  height: 212px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.bgCardImage};
  border-radius: 10px 10px 0px 0px;
  -webkit-border-radius: 10px 10px 0px 0px;
  -moz-border-radius: 10px 10px 0px 0px;

  img {
    width: 70%;
    height: 70%;
    object-fit: scale-down;
  }
`;

export const ContainerCardInfo = styled.div`
  padding: 10px;

  background-color: ${(props) => props.theme.color.bgCardDescription};

  p {
    font-size: 16;
    font-weight: 400;
    line-height: 19px;
    text-align: justify;
    margin-top: 20px;
  }

  border-radius: 0px 0px 10px 10px;
  -webkit-border-radius: 0px 0px 10px 10px;
  -moz-border-radius: 0px 0px 10px 10px;
`;
