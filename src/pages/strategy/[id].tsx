import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Coins, ChartLineUp, CurrencyCircleDollar } from "phosphor-react";
import Layout from "../../components/layout";
import strategies from "../../lib/strategies";

const Strategy = () => {
  const router = useRouter();
  const { id } = router.query;

  const strat = strategies[Number(id)] || null;

  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Layout>
      {strat && (
        <Box display="flex" flexDirection="column">
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ md: "justify-center" }}
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

            <Box></Box>
          </Flex>
        </Box>
      )}
    </Layout>
  );
};

export default Strategy;
