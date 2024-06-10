import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "styled-components";
import Theme from "./theme";

import App from "./App";
import { GlobalStyles } from "./styles/globalStyles";
import { ModalProvider } from "./context/modalContext";
import { BookProvider } from "./context/booksContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookProvider>
      <ModalProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </ModalProvider>
    </BookProvider>
  </React.StrictMode>
);
