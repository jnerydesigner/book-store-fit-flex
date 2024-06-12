import React, { useState } from "react";
import { ContainerFormSearch } from "./style";
import axios from "axios";
import { useBooks } from "../../context/book.context";

export const FormBookSearch: React.FC = () => {
  const { setBooksContext } = useBooks();
  const [titleSearch, setTitleSearch] = useState<string>("");
  const handleSearchBookParams = async () => {
    const response = await axios.get(
      `http://localhost:3333/books/find-all?titleSearch=${titleSearch}`
    );

    if (setBooksContext) setBooksContext(response.data);

    setTitleSearch("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(e.target.value);
  };
  return (
    <ContainerFormSearch>
      <input
        type="text"
        placeholder="Buscar"
        name="titleSearch"
        value={titleSearch}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSearchBookParams}>
        <img src="/lupa.svg" alt="lupa" />
      </button>
    </ContainerFormSearch>
  );
};
