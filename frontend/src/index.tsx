import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "styled-components";
import Theme from "./theme";

import App from "./App";
import { GlobalStyles } from "./styles/globalStyles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
