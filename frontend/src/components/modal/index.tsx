import React from "react";
import {
  ContainerModal,
  ContainerColumnImage,
  ContainerColumnInput,
  ContainerRowInputDescription,
  ContainerRowInputGeneral,
  ContainerInputFile,
  ContainerTitle,
  ContainerModalBackgroundOpacity,
  ContainerRowButtons,
} from "./style";
import { Button } from "../button";
import { useModal } from "../../context/modalContext";

interface ModalProps {
  active: boolean;
}

export const Modal: React.FC<ModalProps> = ({ active }) => {
  const { setShowModal } = useModal();
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <ContainerModalBackgroundOpacity active={active}>
      <ContainerModal>
        <ContainerTitle>
          <h2>Novo Livro</h2>
        </ContainerTitle>
        <form>
          <ContainerRowInputGeneral>
            <ContainerColumnInput>
              <input type="text" placeholder="Título" />
              <input type="text" placeholder="Autor" />
              <input type="text" placeholder="Data de Publicação" />
            </ContainerColumnInput>
            <ContainerColumnImage>
              <img src="/image_input.svg" alt="ima" />
              <ContainerInputFile>
                <label className="custom-file-label" htmlFor="fileInput">
                  Escolher Imagem
                </label>
                <input type="file" id="fileInput" />
              </ContainerInputFile>
            </ContainerColumnImage>
          </ContainerRowInputGeneral>

          <ContainerRowInputDescription>
            <textarea name="" id="" placeholder="Descrição"></textarea>
          </ContainerRowInputDescription>
          <ContainerRowButtons>
            <Button type="button" status="cancel" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" status="save">
              Salvar
            </Button>
          </ContainerRowButtons>
        </form>
      </ContainerModal>
    </ContainerModalBackgroundOpacity>
  );
};
