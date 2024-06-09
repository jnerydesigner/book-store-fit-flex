import styled from "styled-components";

interface ButtonProps {
  status?: "save" | "cancel";
}

export const ContainerButton = styled.button<ButtonProps>`
  width: 228px;
  height: 59px;

  border-radius: 50px;

  font-size: 16px;

  border: 0;

  color: ${(props) => (props.status === "cancel" ? "#202020" : "#ffff")};

  background-color: ${(props) =>
    props.status === "cancel"
      ? props.theme.color.bgButtonCancel
      : props.theme.color.bgButtonSave};

  cursor: pointer;
`;
