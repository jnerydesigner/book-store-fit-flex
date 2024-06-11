import styled from "styled-components";

export const ContainerHeader = styled.div`
  margin: 0 auto;
  height: 150px;
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.font.color.primary};
    height: 29px;
  }
  p {
    font-size: 24px;
    font-weight: 600;
    height: 29px;
  }
`;

export const ContainerHeaderDetail = styled.header`
  width: 100%;
  height: 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const DetailColumnBack = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  svg {
    height: 28px;
    width: 28px;
    margin-right: 10px;
  }
`;
export const DetailColumnEditAndDelete = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  button {
    p:first-child {
      margin-right: 22px;
    }

    p:last-child {
      color: #ad0000;
    }
  }
`;

export const ButtonEdit = styled.button`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  margin-right: 22px;
  font-size: 24px;
  font-weight: 600;
  height: 32px;
  color: ${(props) => props.theme.font.color.primary};
  cursor: pointer;
  border: 0;
  &:hover {
    color: rgba(99, 110, 114, 0.7);
  }

  transition: color 0.3s;
`;

export const ButtonDelete = styled.button`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  margin-right: 22px;
  font-size: 24px;
  font-weight: 600;
  height: 32px;
  color: ${(props) => props.theme.font.color.primary};
  cursor: pointer;
  border: 0;
  color: #ad0000;
  &:hover {
    color: rgba(214, 48, 49, 0.8);
  }

  transition: color 0.3s;
`;
