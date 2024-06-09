import React from "react";
import { Container } from "./style";
import { Header } from "../../components/header";
import { FormBookSearch } from "../../components/form-books-search";
import { Content } from "../../components/content";

export const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <FormBookSearch />
      <Content />
    </Container>
  );
};
