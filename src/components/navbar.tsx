import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import { Coins } from "phosphor-react";

import Connect from "./connect";

export default function Navbar() {
  return (
    <Flex justifyContent="space-between" alignItems="center" height={16}>
      <Box className="navbar-brand">
        <Link href="/">
          <Coins size={32} />
        </Link>
      </Box>
      <Box>
        <Connect />
      </Box>
    </Flex>
  );
}
