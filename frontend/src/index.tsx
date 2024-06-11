import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { BookProvider } from "./context/booksContext";
import { ModalProvider } from "./context/modalContext";
import { GlobalStyles } from "./styles/globalStyles";
import { ThemeProvider } from "styled-components";
import Theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookProvider>
      <ModalProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ModalProvider>
    </BookProvider>
  </React.StrictMode>
);
