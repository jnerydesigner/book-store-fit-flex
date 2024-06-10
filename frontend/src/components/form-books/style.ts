import styled from "styled-components";

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

  input::placeholder {
    font-size: 16px;
  }
`;

export const ContainerColumnImage = styled.div`
  width: 240px;
  height: 226px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bgCardDescription};
  position: relative;
  border-radius: 10px;

  img {
    width: 83px;
  }
  label {
    text-align: justify;
    margin-top: 10px;
    font-size: 16px;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    text-align: justify;
    cursor: pointer;
  }

  /* .custom-file-label {
    display: inline-block;
    width: 83px;
    height: 83px;
    background-size: cover;
    cursor: pointer;
  } */
`;

export const ContainerInputFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const ContainerRowInputDescription = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  textarea::placeholder {
    font-size: 16px;
  }
  textarea {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    padding: 10px;
    border: 0;
  }
`;

export const ContainerRowButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: row;
`;
