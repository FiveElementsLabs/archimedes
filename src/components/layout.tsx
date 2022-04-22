import { Container } from "@chakra-ui/react";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <Container maxW="container.md">
      <Navbar />
      {children}
    </Container>
  );
};
export default Layout;
