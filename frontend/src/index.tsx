import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "styled-components";
import Theme from "./theme";

import App from "./App";
import { GlobalStyles } from "./styles/globalStyles";
import { ModalProvider } from "./context/modalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </ModalProvider>
  </React.StrictMode>
);
