import React, { ReactNode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const GlobalStyle = createGlobalStyle`
  body {
     font-family: 'Roboto', sans-serif;
    background-color: #a7a7a7;

  }
`;

const theme = {
  margin: "auto",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <main>{children}</main>
      </>
    </ThemeProvider>
  );
};

export default Layout;
