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
import axios from "axios";
import { useModal } from "../../context/modalContext";
import { useState } from "react";
import { IBook } from "../../types/book.types";

export const HeaderDetail = () => {
  const { setShowModalEdit } = useModal();
  const [_, setBooks] = useState<IBook[]>();

  const navigate = useNavigate();
  const { book_id: bookId } = useParams() as { book_id: string };
  const handleDelete = async (bookId: string) => {
    axios.delete(`http://localhost:3333/books/${bookId}`);

    if (setBooks) {
      setBooks((prevBooks) => prevBooks?.filter((book) => book.id !== bookId));
    }

    navigate("/");
  };
  return (
    <ContainerHeader>
      <ContainerHeaderDetail>
        <DetailColumnBack>
          <Link to="/">
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
