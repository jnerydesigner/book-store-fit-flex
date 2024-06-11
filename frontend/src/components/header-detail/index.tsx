import { Link } from "react-router-dom";
import {
  ButtonDelete,
  ButtonEdit,
  ContainerHeader,
  ContainerHeaderDetail,
  DetailColumnBack,
  DetailColumnEditAndDelete,
} from "./style";
import { IoChevronBackOutline } from "react-icons/io5";

export const HeaderDetail = () => {
  const handleDelete = (bookId: string) => {
    console.log(bookId);
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
          <ButtonEdit>Editar</ButtonEdit>
          <ButtonDelete onClick={() => handleDelete("1")}>Excluir</ButtonDelete>
        </DetailColumnEditAndDelete>
      </ContainerHeaderDetail>
    </ContainerHeader>
  );
};
