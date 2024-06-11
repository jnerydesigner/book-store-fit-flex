import React from "react";
import { ContainerContent } from "./style";
import Card from "../card";
import { useBooks } from "../../context/booksContext";
import { Link } from "react-router-dom";

export const Content: React.FC = () => {
  const { books } = useBooks();
  return (
    <ContainerContent>
      {books.map((book) => (
        <Link to={`/book/${book.id}`} key={book.id}>
          <Card {...book} />
        </Link>
      ))}
    </ContainerContent>
  );
};
