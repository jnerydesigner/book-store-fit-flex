import React from "react";
import { ContainerCard, ContainerCardImage, ContainerCardInfo } from "./style";

export const Card: React.FC = () => {
  return (
    <ContainerCard>
      <ContainerCardImage>
        <img
          src="https://m.media-amazon.com/images/I/81sTm5M7wjL._SY466_.jpg"
          alt="Livro"
        />
      </ContainerCardImage>
      <ContainerCardInfo>
        <h3>A revolução dos bichos: Um conto de fadas</h3>
        <p>
          Escrita em plena Segunda Guerra Mundial e publicada em 1945 depois de
          ter sido rejeitada por várias editoras, essa pequena narrativa causou
          desconforto ao satirizar ferozmente a ditadura stalinista numa época
          em que os soviéticos ainda eram aliados do Ocidente na luta contra o
          eixo nazi-fascista.
        </p>
      </ContainerCardInfo>
    </ContainerCard>
  );
};
