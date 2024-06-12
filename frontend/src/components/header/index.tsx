import React from "react";
import { ContainerHeader } from "./style";
import { useModal } from "../../context/modalContext";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { setShowModal } = useModal();
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <ContainerHeader>
      <Link to={"/"}>
        <h2>Livros</h2>
      </Link>
      <button type="button" onClick={handleClick}>
        <h3>Novo</h3>
      </button>
    </ContainerHeader>
  );
};
