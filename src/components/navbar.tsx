import Link from "next/link";
import { Box, Flex, Heading } from "@chakra-ui/react";

import Connect from "./connect";

export default function Navbar() {
  return (
    <Flex justifyContent="space-between" alignItems="center" height={16}>
      <Box cursor="pointer">
        <Link href="/" passHref>
          <Heading fontSize="2xl">Archimedes</Heading>
        </Link>
      </Box>
      <Box>
        <Connect />
      </Box>
    </Flex>
  );
}
