import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import { theme } from "../lib/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body
          style={{
            background:
              "linear-gradient(153deg, rgba(12,8,96,1) 0%, rgba(23,142,166,1) 100%)",
            minHeight: "100vh",
          }}
        >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
