import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: {
              yul: true,
            },
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: process.env.ALCHEMY_KOVAN_URL,
      },
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY,
          balance: "1000000000000000000000",
        },
      ],
    },
  },
  mocha: {
    timeout: 100000,
  },
};
