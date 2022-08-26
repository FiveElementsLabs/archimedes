const networks = {
  1: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
  42: {
    chainId: `0x${Number(42).toString(16)}`,
    chainName: "Kovan",
    nativeCurrency: {
      name: "Kovan Ether",
      symbol: "kETH",
      decimals: 18,
    },
    rpcUrls: ["https://kovan.poa.network"],
    blockExplorerUrls: ["https://kovan.etherscan.io/"],
  },
};

export default networks;
