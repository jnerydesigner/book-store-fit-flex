import React from "react";
import {
  ContainerModal,
  ContainerColumnImage,
  ContainerColumnInput,
  ContainerRowInputDescription,
  ContainerRowInputGeneral,
} from "./style";

export const Modal: React.FC = () => {
  return (
    <ContainerModal>
      <h2>Novo Livro</h2>
      <form>
        <ContainerRowInputGeneral>
          <ContainerColumnInput>
            <input type="text" placeholder="Título" />
            <input type="text" placeholder="Autor" />
            <input type="text" placeholder="Data de Publicação" />
          </ContainerColumnInput>
          <ContainerColumnImage>
            <label className="custom-file-label" htmlFor="fileInput"></label>
            <input type="file" id="fileInput" className="file-input" />
          </ContainerColumnImage>
        </ContainerRowInputGeneral>

        <ContainerRowInputDescription>
          <textarea name="" id="" placeholder="Descrição"></textarea>
        </ContainerRowInputDescription>
      </form>
    </ContainerModal>
  );
};
