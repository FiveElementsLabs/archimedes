import Link from "next/link";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

interface IStrategy {
  imgSrc: string;
  name: string;
  desc: string;
}

export default function StragegyCard({ imgSrc, name, desc }: IStrategy) {
  return (
    <Center>
      <Box
        mt={4}
        w="270px"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
        border="1px solid white"
      >
        <Image
          h={"100px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={imgSrc}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
            <Text color={"gray.500"}>{desc}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>$230k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                TVL
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>52%</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                APY
              </Text>
            </Stack>
          </Stack>

          <Link href="/strategy/1" passHref>
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#388d9e", "#0a4faf")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Manage
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}
