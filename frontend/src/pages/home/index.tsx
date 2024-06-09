import React from "react";
import { Container } from "./style";
import { Header } from "../../components/header";
import { FormBookSearch } from "../../components/form-books-search";
import { Content } from "../../components/content";
import { Modal } from "../../components/modal";
import { useModal } from "../../context/modalContext";

export const Home: React.FC = () => {
  const { showModal } = useModal();

  return (
    <Container>
      <Header />
      <FormBookSearch />
      <Content />
      <Modal active={showModal} />
    </Container>
  );
};
