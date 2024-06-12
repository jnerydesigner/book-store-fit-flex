import { useParams } from "react-router-dom";
import {
  ContainerBookDetail,
  ContainerColumnDetails,
  ContainerImage,
  ContainerDetailsAuthorAndRelease,
  ContainerDetails,
  ImageBook,
} from "./style";
import { useCallback, useEffect, useState } from "react";
import { HeaderDetail } from "../../components/header-detail";
import { ModalEdit } from "../../components/modal-edit";
import { useModal } from "../../context/modalContext";
import { IBook, IBookContext } from "../../types/book.types";
import { useBooks } from "../../context/book.context";
import api from "../../api";

export const BookDetail = () => {
  const [book, setBook] = useState<IBook>({} as IBook);
  const { book_id: bookId } = useParams() as { book_id: string };
  const { bookResponse, setBookResponse } = useBooks();

  const { showModalEdit } = useModal();

  const handlePayloadBook = useCallback(
    async (id: string): Promise<IBookContext> => {
      const resp = await api.get(`/books/${id}`);

      const response = {
        id: resp.data.id,
        title: resp.data.title,
        releaseDate: resp.data.releaseDate,
        description: resp.data.description,
        authorId: resp.data.authorId,
        imageUrl: resp.data.imageUrl,
        author: resp.data.authorId,
        Author: {
          name: resp.data.authorId,
        },
      };

      if (setBookResponse) setBookResponse(response);

      return response;
    },
    []
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
              {bookResponse && bookResponse.title} {book.title}
            </h1>
            <ContainerDetailsAuthorAndRelease>
              <p>Por {bookResponse?.authorId}</p>
              <p>Publicado em {book.releaseDate}</p>
            </ContainerDetailsAuthorAndRelease>
            <p>{bookResponse && bookResponse.description}</p>
          </ContainerColumnDetails>
          <ContainerImage>
            <ImageBook
              src={bookResponse && bookResponse.imageUrl}
              alt={bookResponse && bookResponse.title}
            />
          </ContainerImage>
        </ContainerDetails>
      </ContainerBookDetail>
      <ModalEdit active={showModalEdit} />
    </>
  );
};
