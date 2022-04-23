import { Box, Heading } from "@chakra-ui/react";
import Layout from "../components/layout";
import StragegyCard from "../components/strategyCard";
import strategies from "../lib/strategies";

export default function indexPage() {
  return (
    <Layout>
      <Heading fontSize="3xl" textAlign="center">
        Leverage made simple
      </Heading>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        rowGap="2.5rem"
        pt={8}
        pb={20}
      >
        {strategies.map((strat, idx) => (
          <StragegyCard
            key={idx}
            id={idx}
            name={strat.name}
            desc={strat.desc}
            imgSrc={strat.imgSrc}
            tvl={strat.tvl}
            apy={strat.apy}
          />
        ))}
      </Box>
    </Layout>
  );
}
