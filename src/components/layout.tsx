import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useWallet } from "../hooks/useWallet";
import { useSharedState } from "../lib/store";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  const [{ account }] = useSharedState();
  const { autoLoginWallet } = useWallet();

  // Things that need to be loaded only on the first render
  useEffect(() => {
    (async () => {
      if (!account) await autoLoginWallet();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW="container.lg">
      <Navbar />
      <Box mt={4}>{children}</Box>
    </Container>
  );
};
export default Layout;
