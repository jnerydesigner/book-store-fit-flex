import React from "react";
import { ContainerContent } from "./style";
import Card from "../card";
import { useBooks } from "../../context/booksContext";

export const Content: React.FC = () => {
  const { books } = useBooks();
  return (
    <ContainerContent>
      {books.map((book) => (
        <Card key={book.id} {...book} />
      ))}
    </ContainerContent>
  );
};
