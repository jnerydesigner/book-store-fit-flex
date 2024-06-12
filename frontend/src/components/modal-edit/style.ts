import styled from "styled-components";

interface ModalProps {
  active: boolean;
}

export const ContainerModalBackgroundOpacity = styled.div<ModalProps>`
  display: ${(props) => (props.active ? "flex" : "none")};

  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;
  background-color: rgba(223, 230, 233, 0.8);
  backdrop-filter: blur(2px);

  transition: all 1s;
`;

export const ContainerModal = styled.div`
  height: 700px;
  width: 780px;
  display: grid;
  grid-template-rows: 80px 1fr;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.color.bgModal};

  border-radius: 10px;

  form {
    display: grid;
    grid-template-rows: 1fr 1fr 80px;

    gap: 20px;
  }
`;

export const ContainerTitle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 32px;
  }
`;
