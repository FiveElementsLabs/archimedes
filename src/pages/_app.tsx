import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SharedStateProvider } from "../lib/store";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SharedStateProvider>
        <Head>
          <title>Archimedes</title>
        </Head>
        <Component {...pageProps} />
      </SharedStateProvider>
    </ChakraProvider>
  );
}

export default MyApp;
