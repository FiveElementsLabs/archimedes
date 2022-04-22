import { Button, Box, Flex, Container } from "@chakra-ui/react";
import { Coins } from "phosphor-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex justifyContent="space-between" alignItems="center" height={16}>
      <Box className="navbar-brand">
        <Link href="/">
          <Coins size={32} />
        </Link>
      </Box>
      <Box>
        <Button>Connect</Button>
      </Box>
    </Flex>
  );
}
