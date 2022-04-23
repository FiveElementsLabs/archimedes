import { Box, Container } from "@chakra-ui/react";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <Container maxW="container.md">
      <Navbar />
      <Box mt={4}>{children}</Box>
    </Container>
  );
};
export default Layout;
