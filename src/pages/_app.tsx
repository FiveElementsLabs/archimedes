import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SharedStateProvider } from "../lib/store";
import { useEvents } from "../hooks/useEvents";

type IProps = {
  Component: React.FC<any>;
  pageProps: any;
};

function MyApp({ Component, pageProps }: IProps) {
  useEvents();

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
