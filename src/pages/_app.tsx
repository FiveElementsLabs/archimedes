import { ChakraProvider } from "@chakra-ui/react";
import { SharedStateProvider } from "../lib/store";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SharedStateProvider>
        <Component {...pageProps} />
      </SharedStateProvider>
    </ChakraProvider>
  );
}

export default MyApp;
