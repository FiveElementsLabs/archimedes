import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: "https://kovan.infura.io/v3/61a9f83ab0ae4873818b67960409b7fe",
      },
    },
  },
};
