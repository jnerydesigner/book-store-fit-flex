import styled from "styled-components";

export const ContainerModal = styled.div`
  height: 700px;
  width: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.color.bgModal};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;

  position: absolute;
`;

export const ContainerRowInputGeneral = styled.div`
  height: 226px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;
export const ContainerColumnInput = styled.div`
  width: 428px;
  height: 226px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  input {
    width: 100%;
    height: 54px;
    border-radius: 10px;
    padding: 0 10px;
    border: 0;
  }
`;
export const ContainerColumnImage = styled.div`
  width: 240px;
  height: 226px;
  .file-input-container {
    position: relative;
    display: inline-block;
  }
  .file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .custom-file-label {
    display: inline-block;
    width: 150px;
    height: 150px;
    background-image: url("");
    background-size: cover;
    cursor: pointer;
  }
`;
export const ContainerRowInputDescription = styled.div``;
