import React, { useEffect } from "react";
import { ContainerContent } from "./style";
import Card from "../card";
import { Link } from "react-router-dom";

import { useBooks } from "../../context/book.context";

export const Content: React.FC = () => {
  const { booksContext: books } = useBooks();

  useEffect(() => {
    console.log(books);
  });

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
