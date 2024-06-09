import React from "react";
import { ContainerFormSearch } from "./style";

export const FormBookSearch: React.FC = () => {
  return (
    <ContainerFormSearch>
      <input type="text" placeholder="Buscar" />
      <button>
        <img src="/lupa.svg" alt="lupa" />
      </button>
    </ContainerFormSearch>
  );
};
