import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ButtonDelete,
  ButtonEdit,
  ContainerHeader,
  ContainerHeaderDetail,
  DetailColumnBack,
  DetailColumnEditAndDelete,
} from "./style";
import { IoChevronBackOutline } from "react-icons/io5";

import { useModal } from "../../context/modalContext";
import { useState } from "react";
import { IBook } from "../../types/book.types";
import { useBooks } from "../../context/book.context";
import api from "../../api";

export const HeaderDetail = () => {
  const { setShowModalEdit } = useModal();
  const { setBooksContext } = useBooks();
  const [_, setBooks] = useState<IBook[]>();

  const navigate = useNavigate();
  const { book_id: bookId } = useParams() as { book_id: string };
  const handleDelete = async (bookId: string) => {
    console.log("bookId", bookId);
    try {
      await api.delete(`/books/${bookId}`);
      const updatedBooksRes = await api.get<IBook[]>("/books/find-all");
      const updatedBooks = updatedBooksRes.data;

      const filteredBooks = updatedBooks.filter((book) => book.id !== bookId);

      if (setBooksContext) {
        setBooksContext(filteredBooks);
      }

      navigate("/");
    } catch (err) {
      const booksRes = await api.get<IBook[]>(`/books/find-all`);

      if (setBooksContext) {
        setBooksContext(booksRes.data);
      }

      navigate("/");
    }
  };

  const handleBackHome = async () => {
    const response = await api.get(`/books/find-all`);
    if (setBooksContext) {
      setBooksContext(response.data);
    }
    navigate("/");
  };
  return (
    <ContainerHeader>
      <ContainerHeaderDetail>
        <DetailColumnBack>
          <Link to={"/"} onClick={handleBackHome}>
            <IoChevronBackOutline />
          </Link>
          <p>Voltar</p>
        </DetailColumnBack>
        <DetailColumnEditAndDelete>
          <ButtonEdit onClick={() => setShowModalEdit(true)}>Editar</ButtonEdit>
          <ButtonDelete onClick={() => handleDelete(bookId)}>
            Excluir
          </ButtonDelete>
        </DetailColumnEditAndDelete>
      </ContainerHeaderDetail>
    </ContainerHeader>
  );
};
