import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
    }
    body{
        background-color: ${(props) => props.theme.color.background};
        color: ${(props) => props.theme.font.color.primary};
    }
    h1,h2,h3{
        color: ${(props) => props.theme.font.color.primary};
    }
   
`;
