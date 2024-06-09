import React from "react";
import { ContainerHeader } from "./style";
import { useModal } from "../../context/modalContext";

export const Header: React.FC = () => {
  const { setShowModal } = useModal();
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <ContainerHeader>
      <h2>Livros</h2>
      <button type="button" onClick={handleClick}>
        <h3>Novo</h3>
      </button>
    </ContainerHeader>
  );
};
