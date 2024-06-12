import React, { useEffect, useState } from "react";
import { ContainerContent } from "./style";
import Card from "../card";
import { Link } from "react-router-dom";
import axios from "axios";
import { IBook } from "../../types/book.types";
import { useBooks } from "../../context/book.context";

export const Content: React.FC = () => {
  const { booksContext: books } = useBooks();
  // useEffect(() => {
  //   handleBooks();
  // }, []);
  // const [books, setBooks] = useState<IBook[]>([]);
  // const handleBooks = async () => {
  //   const response = await axios.get("http://localhost:3333/books/find-all");
  //   setBooks(response.data);
  // };
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
