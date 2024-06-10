import React from "react";
import {
  ContainerModal,
  ContainerTitle,
  ContainerModalBackgroundOpacity,
} from "./style";

import { FormBooks } from "../form-books";

interface ModalProps {
  active: boolean;
}

export const Modal: React.FC<ModalProps> = ({ active }) => {
  return (
    <ContainerModalBackgroundOpacity active={active}>
      <ContainerModal>
        <ContainerTitle>
          <h2>Novo Livro</h2>
        </ContainerTitle>
        <FormBooks />
      </ContainerModal>
    </ContainerModalBackgroundOpacity>
  );
};
