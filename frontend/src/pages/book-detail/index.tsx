import { useParams } from "react-router-dom";
import {
  ContainerBookDetail,
  ContainerColumnDetails,
  ContainerImage,
  ContainerDetailsAuthorAndRelease,
  ContainerDetails,
  ImageBook,
} from "./style";
import { useEffect, useState, useCallback } from "react";
import { HeaderDetail } from "../../components/header-detail";
import { ModalEdit } from "../../components/modal-edit";
import { useModal } from "../../context/modalContext";
import { IBook, IBookContext } from "../../types/book.types";
import { useBooks } from "../../context/book.context";

export const BookDetail = () => {
  const { book_id: bookId } = useParams() as { book_id: string };
  const [book, setBook] = useState<IBook>({} as IBook);
  const [bookResponse, setBookResponse] = useState<IBookContext>(
    {} as IBookContext
  );

  const { showModalEdit } = useModal();
  const { booksContext } = useBooks();
  const handlePayloadBook = useCallback(
    async (id: string): Promise<IBookContext> => {
      const res = booksContext.find((book) => {
        return book.id === id;
      }) as IBook;

      if (res === undefined) {
        return {} as IBookContext;
      }

      const response = {
        id: res.id,
        title: res.title,
        releaseDate: res.releaseDate,
        description: res.description,
        authorId: res.authorId,
        imageUrl: res.imageUrl,
        author: "Jander Nery",
      };

      setBookResponse(response);

      return response;
    },
    [booksContext]
  );

  useEffect(() => {
    handlePayloadBook(bookId);
  }, [bookId, handlePayloadBook]);

  if (!book) return <div>Loading...</div>;

  return (
    <>
      <ContainerBookDetail>
        <HeaderDetail />
        <ContainerDetails>
          <ContainerColumnDetails>
            <h1>
              {bookResponse.title} {book.title}
            </h1>
            <ContainerDetailsAuthorAndRelease>
              <p>Por {bookResponse.author}</p>
              <p>Publicado em {book.releaseDate}</p>
            </ContainerDetailsAuthorAndRelease>
            <p>{bookResponse.description}</p>
          </ContainerColumnDetails>
          <ContainerImage>
            <ImageBook src={bookResponse.imageUrl} alt={bookResponse.title} />
          </ContainerImage>
        </ContainerDetails>
      </ContainerBookDetail>
      <ModalEdit
        active={showModalEdit}
        authorActive={bookResponse.author}
        bookActive={bookResponse}
      />
    </>
  );
};
