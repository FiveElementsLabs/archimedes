import { Box, Heading } from "@chakra-ui/react";
import Layout from "../components/layout";
import StragegyCard from "../components/strategyCard";

export default function indexPage() {
  return (
    <Layout>
      <Heading fontSize="3xl" textAlign="center">
        Choose your favorite Automated strategy
      </Heading>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        rowGap="2.5rem"
        pt={8}
        pb={20}
      >
        <StragegyCard
          name="USDC 10x Yearn"
          desc="Gearbox Leveraged"
          imgSrc="https://www.cryptofonts.com/img/icons/usdc.svg"
        />
        <StragegyCard
          name="ETH 5x Lido"
          desc="Gearbox Leveraged"
          imgSrc="https://www.cryptofonts.com/img/icons/eth.svg"
        />
        <StragegyCard
          name="Exotic Options"
          desc="Gearbox Leveraged"
          imgSrc="https://www.cryptofonts.com/img/icons/options.svg"
        />

        <StragegyCard
          name="USDT 10x Curve"
          desc="Gearbox Leveraged"
          imgSrc="https://www.cryptofonts.com/img/icons/usdt.svg"
        />
        <StragegyCard
          name="WBTC 5x Curve"
          desc="Gearbox Leveraged"
          imgSrc="https://www.cryptofonts.com/img/icons/wbtc.svg"
        />
        <StragegyCard
          name="DAI 10x Yearn"
          desc="Gearbox Leveraged"
          imgSrc="https://www.cryptofonts.com/img/icons/dai.svg"
        />
      </Box>
    </Layout>
  );
}
