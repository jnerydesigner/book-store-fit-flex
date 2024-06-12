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
  authorActive: string;
  bookActive: IBookContext;
}

export const ModalEdit: React.FC<ModalProps> = ({
  active,
  authorActive,
  bookActive,
}) => {
  return (
    <ContainerModalBackgroundOpacity active={active}>
      <ContainerModal>
        <ContainerTitle>
          <h2>Editar livro</h2>
        </ContainerTitle>
        <FormBookEdit authorActive={authorActive} bookOne={bookActive} />
      </ContainerModal>
    </ContainerModalBackgroundOpacity>
  );
};
