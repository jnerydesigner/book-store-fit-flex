import { useParams } from "react-router-dom";
import {
  ContainerBookDetail,
  ContainerColumnDetails,
  ContainerImage,
  ContainerDetailsAuthorAndRelease,
  ContainerDetails,
} from "./style";
import { useEffect, useState, useCallback } from "react";
import { IBook } from "../../context/booksContext";
import { HeaderDetail } from "../../components/header-detail";
import axios from "axios";

export const BookDetail = () => {
  const [book, setBook] = useState<IBook>({} as IBook);
  const [author, setAuthor] = useState<string>("");
  const { book_id } = useParams() as { book_id: string };

  const handleSearchBook = useCallback(
    async (bookId: string) => {
      console.log(book_id);
      const { data } = await axios.get<IBook>(
        `http://localhost:3333/books/${bookId}`
      );

      console.log(data.Author.name);

      setAuthor(data.Author.name);
      setBook(data);
    },
    [book_id]
  );

  useEffect(() => {
    handleSearchBook(book_id);
  }, [book_id, handleSearchBook]);

  return (
    <ContainerBookDetail>
      <HeaderDetail />
      <ContainerDetails>
        <ContainerColumnDetails>
          <h1>{book.title}</h1>
          <ContainerDetailsAuthorAndRelease>
            <p>Por {author}</p>
            <p>Publicado em {book.releaseDate}</p>
          </ContainerDetailsAuthorAndRelease>
          <p>{book.description}</p>
        </ContainerColumnDetails>
        <ContainerImage>
          <img src={book.imageUrl} alt={book.title} />
        </ContainerImage>
      </ContainerDetails>
    </ContainerBookDetail>
  );
};
