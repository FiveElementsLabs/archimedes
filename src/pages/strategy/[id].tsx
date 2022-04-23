import {
  Box,
  Flex,
  Button,
  Avatar,
  Heading,
  Text,
  Badge,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Coins, ChartLineUp, CurrencyCircleDollar, Swap } from "phosphor-react";
import Layout from "../../components/layout";
import strategies from "../../lib/strategies";

const Strategy = () => {
  const router = useRouter();
  const { id } = router.query;

  const strat = strategies[Number(id)] || null;

  const cardBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Layout>
      {strat && (
        <Box display="flex" flexDirection="column">
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ base: "start", md: "space-between" }}
            alignItems={{ base: "center", md: "start" }}
          >
            <Flex flexDirection="column">
              <Box>
                <Badge fontSize="lg" colorScheme="cyan">
                  {strat.desc} Strategy
                </Badge>
              </Box>
              <Heading mt={1} fontSize="4xl" fontWeight="600">
                {strat.name}
              </Heading>
              <Text mt={3} fontSize="lg" opacity={0.8}>
                {strat.longDesc}
              </Text>

              <Flex mt={6} gap="1rem">
                <Box
                  id="card"
                  w="100px"
                  display="grid"
                  placeContent="center"
                  bgColor={cardBg}
                  rounded="lg"
                >
                  <Flex flexDirection="column" textAlign="center">
                    <Box mt={5} w="full" display="grid" placeContent="center">
                      <CurrencyCircleDollar size={32} />
                    </Box>
                    <Text mt={2} fontSize="sm">
                      Asset
                    </Text>
                    <Heading mb={5} fontSize="xl">
                      {strat.asset}
                    </Heading>
                  </Flex>
                </Box>
                <Box
                  id="card"
                  w="100px"
                  display="grid"
                  placeContent="center"
                  bgColor={cardBg}
                  rounded="lg"
                >
                  <Flex flexDirection="column" textAlign="center">
                    <Box mt={5} w="full" display="grid" placeContent="center">
                      <Coins size={32} />
                    </Box>
                    <Text mt={2} fontSize="sm">
                      TVL
                    </Text>
                    <Heading mb={5} fontSize="xl">
                      ${strat.tvl}k
                    </Heading>
                  </Flex>
                </Box>
                <Box
                  id="card"
                  w="100px"
                  display="grid"
                  placeContent="center"
                  bgColor={cardBg}
                  rounded="lg"
                >
                  <Flex flexDirection="column" textAlign="center">
                    <Box mt={5} w="full" display="grid" placeContent="center">
                      <ChartLineUp size={32} />
                    </Box>
                    <Text mt={2} fontSize="sm">
                      APY
                    </Text>
                    <Heading mb={5} fontSize="xl">
                      {strat.apy}%
                    </Heading>
                  </Flex>
                </Box>
              </Flex>
            </Flex>

            <Box
              position="relative"
              mt={{ base: "2rem", md: "0" }}
              bgColor={cardBg}
              rounded="lg"
              p={5}
              w="320px"
              h="260px"
            >
              <Heading fontSize="3xl" fontWeight="700">
                Deposit
              </Heading>
              <Flex mt={2} alignItems="center">
                <Text opacity={0.9}>
                  {strat.asset} {strat.leverage}x Leverage
                </Text>
                <Avatar
                  position="absolute"
                  top="1rem"
                  right="1rem"
                  mt={3}
                  size={"lg"}
                  src={strat.imgSrc}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>
              <Flex mt={10}>
                <Input
                  roundedTopRight="none"
                  roundedBottomRight="none"
                  placeholder="Amount"
                />
                <Button roundedTopLeft="none" roundedBottomLeft="none" w="75px">
                  Max
                </Button>
              </Flex>
              <Button mt={3} w="full">
                Deposit
              </Button>
            </Box>
          </Flex>

          <Box mt={5} bgColor={cardBg} rounded="lg" p={4}>
            <Heading fontSize="2xl">Your Position</Heading>
            <Text>Shares + yUSDC owned, health factor, total borrowed</Text>
          </Box>

          <Box mt={5} bgColor={cardBg} rounded="lg" p={4}>
            <Heading fontSize="2xl">About this strategy</Heading>
            <Text>
              Imagine we had a very precise description for this strategy. Most
              people would probably not read it anyway
            </Text>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default Strategy;
