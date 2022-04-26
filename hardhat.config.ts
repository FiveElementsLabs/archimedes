import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const HARDHAT_DEFAULT_PK: string =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

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
    kovan: {
      url: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [process.env.PRIVATE_KEY],
    },
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
        {
          privateKey: HARDHAT_DEFAULT_PK,
          balance: "1000000000000000000000",
        },
      ],
    },
  },
  mocha: {
    timeout: 100000,
  },
};
