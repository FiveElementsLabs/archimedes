import { useState, useEffect } from "react";
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
import {
  Coins,
  ChartLineUp,
  CurrencyCircleDollar,
  ArrowRight,
  Gear,
  Drop,
  ShieldCheck,
} from "phosphor-react";

import { useSharedState } from "../../lib/store";
import { useStrategyUSDC } from "../../hooks/useStrategyUSDC";
import Layout from "../../components/layout";
import strategies from "../../lib/strategies";

const Strategy = () => {
  const [{ provider }] = useSharedState();
  const { deposit, withdraw, balanceOf, healthFactor } = useStrategyUSDC();
  const [amountUsdc, setAmountUsdc] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const strat = strategies[Number(id)] || null;

  const cardBg = useColorModeValue("gray.200", "gray.800");
  const cardBg2 = useColorModeValue("gray.300", "gray.700");
  const buttonBg = useColorModeValue(
    "#388d9e",
    "linear(to-r, #1a81bd, #202ec2)"
  );
  const buttonBgHover = useColorModeValue(
    "#1795ae",
    "linear(to-r, #0e80c2, #1420a9)"
  );
  const iconsBg = useColorModeValue("#04346f", "#4083e0");
  const card1Shadow = useColorModeValue(
    "0 0 0 3px rgba(117, 69, 211, 0.6)",
    "0 0 0 3px rgba(160, 116, 248, 0.6)"
  );
  const card2Shadow = useColorModeValue(
    "0 0 0 3px rgba(106, 49, 221, 0.6)",
    "0 0 0 3px rgba(68, 124, 220, 0.6)"
  );
  const [Tvl, setTvl] = useState(0);
  const [HealtFactor, setHealtFactor] = useState(0);

  useEffect(() => {
    const getData = async () => {
      if (provider) {
        const balance = await balanceOf();
        setTvl(balance);

        const HF: any = await healthFactor();
        setHealtFactor(HF);
      }
    };

    getData();
  }, [provider]);

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
                <Flex gap="0.6rem">
                  <Badge
                    display="flex"
                    alignItems="center"
                    fontSize="lg"
                    colorScheme="blue"
                  >
                    <Gear size={25} />
                    <Text ml={1}>{strat.desc} Strategy</Text>
                  </Badge>
                  <Badge
                    display="flex"
                    alignItems="center"
                    fontSize="lg"
                    colorScheme="green"
                  >
                    <ShieldCheck size={25} />
                    <Text ml={1}> liquidation protected</Text>
                  </Badge>
                </Flex>
              </Box>
              <Heading mt={2} fontSize="5xl" fontWeight="700" color="gray.100">
                {strat.name}
              </Heading>
              <Text mt={3} fontSize="lg" opacity={0.8}>
                {strat.longDesc}
              </Text>

              <Flex mt={6} gap="1rem">
                <Box
                  id="card1"
                  w="100px"
                  display="grid"
                  placeContent="center"
                  bgColor={cardBg}
                  rounded="lg"
                  boxShadow={card1Shadow}
                >
                  <Flex flexDirection="column" textAlign="center">
                    <Box
                      mt={5}
                      w="full"
                      display="grid"
                      placeContent="center"
                      color={iconsBg}
                    >
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
                  id="card2"
                  w="100px"
                  display="grid"
                  placeContent="center"
                  bgColor={cardBg}
                  rounded="lg"
                  boxShadow={card1Shadow}
                >
                  <Flex flexDirection="column" textAlign="center">
                    <Box
                      mt={5}
                      w="full"
                      display="grid"
                      placeContent="center"
                      color={iconsBg}
                    >
                      <Coins size={32} />
                    </Box>
                    <Text mt={2} fontSize="sm">
                      TVL
                    </Text>
                    <Heading mb={5} fontSize="xl">
                      <Box>${Tvl}k</Box>
                    </Heading>
                  </Flex>
                </Box>
                <Box
                  id="card3"
                  w="100px"
                  display="grid"
                  placeContent="center"
                  rounded="lg"
                  bgColor={cardBg}
                  boxShadow={card1Shadow}
                >
                  <Flex flexDirection="column" textAlign="center">
                    <Box
                      mt={5}
                      w="full"
                      display="grid"
                      placeContent="center"
                      color={iconsBg}
                    >
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
              w="350px"
              h="280px"
              boxShadow={card2Shadow}
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
                  right="1.5rem"
                  mt={3}
                  size={"lg"}
                  src={strat.imgSrc}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>
              <Flex mt={14}>
                <Input
                  onChange={(e) => setAmountUsdc(Number(e.target.value))}
                  type="number"
                  roundedTopRight="none"
                  roundedBottomRight="none"
                  placeholder="Amount"
                />
                <Button roundedTopLeft="none" roundedBottomLeft="none" w="75px">
                  Max
                </Button>
              </Flex>
              <Button
                mt={3}
                w="full"
                bgGradient={buttonBg}
                _hover={{ bgGradient: buttonBgHover }}
                onClick={() => deposit((amountUsdc * 1e6).toString())}
              >
                Deposit
              </Button>
            </Box>
          </Flex>

          <Box mt={6} bgColor={cardBg} rounded="lg" p={4}>
            <Heading mb={4} fontSize="2xl">
              Your Position
            </Heading>
            <Flex
              mb={4}
              p={4}
              w="full"
              justifyContent="space-between"
              alignItems="center"
              bgColor={cardBg2}
              rounded="lg"
            >
              <Flex alignItems="center" gap="2rem">
                <Avatar src={strat.imgSrc} />
                <Text fontSize="xl" fontWeight="600">
                  Collateral: <b>$10,532.52</b>
                </Text>
                <Text fontSize="xl" fontWeight="600">
                  Shares: <b>24.5</b> of <b>1240.2</b>
                </Text>
              </Flex>
              <Button
                px={5}
                bgGradient="linear(to-r, yellow.600, red.500)"
                _hover={{ bgGradient: "linear(to-r, yellow.700, red.600)" }}
                onClick={() => withdraw()}
              >
                Withdraw
                <Box ml={2}>
                  <ArrowRight size={24} />
                </Box>
              </Button>
            </Flex>
          </Box>

          <Box mt={4} bgColor={cardBg} rounded="lg" p={4}>
            <Heading mb={4} fontSize="2xl">
              Pool status
            </Heading>
            <Flex
              mb={4}
              p={4}
              w="full"
              justifyContent="space-between"
              alignItems="center"
              bgColor={cardBg2}
              rounded="lg"
            >
              <Flex alignItems="center" gap="2rem">
                <Box color={iconsBg}>
                  <Drop size={32} />
                </Box>
                <Text display="flex" fontSize="xl" fontWeight="600">
                  Health Factor:
                  <span style={{ marginLeft: "8px" }} color="orange.600">
                    {HealtFactor}
                  </span>
                </Text>
                <Text fontSize="xl" fontWeight="600">
                  Borrowed value: <b>$2,214,241.04</b>
                </Text>
                <Text fontSize="xl" fontWeight="600">
                  Leverage: <b>10x</b>
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Box mt={4} bgColor={cardBg} rounded="lg" p={4}>
            <Heading fontSize="2xl">About this strategy</Heading>
            <Text my={2}>
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
