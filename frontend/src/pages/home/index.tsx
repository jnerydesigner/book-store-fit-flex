import React from "react";
import { Container } from "./style";
import { Header } from "../../components/header";
import { FormBookSearch } from "../../components/form-books-search";
import { Content } from "../../components/content";
import { Modal } from "../../components/modal";

export const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <FormBookSearch />
      <Content />
      <Modal />
    </Container>
  );
};
