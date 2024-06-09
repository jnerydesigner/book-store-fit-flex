import styled from "styled-components";

export const ContainerFormSearch = styled.form`
  margin: 0 auto;
  width: 1000px;
  background-color: ${(props) => props.theme.input.color.primary};
  height: 54px;
  border-radius: 10px;
  box-shadow: 0px 1px 17px -4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 1px 17px -4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 17px -4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  justify-content: center;
  button {
    background-color: transparent;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    width: 54px;
    cursor: pointer;
  }
  input {
    padding: 0 20px;
    width: 95%;
    height: 54px;
    border-radius: 10px;
    border: 0;
  }

  input::placeholder {
    font-size: 18px;
    color: ${(props) => props.theme.font.color.primary};
  }

  p {
    position: absolute;
    font-size: 18px;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: ${(props) => props.theme.font.color.primary};
  }
`;
