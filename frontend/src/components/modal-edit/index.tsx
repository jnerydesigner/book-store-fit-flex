import React from "react";
import {
  ContainerModal,
  ContainerTitle,
  ContainerModalBackgroundOpacity,
} from "./style";

import { FormBookEdit } from "../form-books-edit";
import { IBookContext } from "../../types/book.types";

interface ModalProps {
  active: boolean;
}

export const ModalEdit: React.FC<ModalProps> = ({ active }) => {
  return (
    <ContainerModalBackgroundOpacity active={active}>
      <ContainerModal>
        <ContainerTitle>
          <h2>Editar livro</h2>
        </ContainerTitle>
        <FormBookEdit />
      </ContainerModal>
    </ContainerModalBackgroundOpacity>
  );
};
