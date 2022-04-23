require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
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
        url: "https://kovan.infura.io/v3/61a9f83ab0ae4873818b67960409b7fe",
      },
    },
  },
};
