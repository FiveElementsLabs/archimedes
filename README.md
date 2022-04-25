<h1 align="center">Archimedes</h1>

> Archimedes is an ETH Amsterdam hackaton project made by [Five Elements Labs](https://fiveelementslabs.com/)

**🏆 Update: Archimedes won the 1st prize for Gearbox Protocol, 1st prize for Yearn Finance and 1st prize for Tribe DAO.**

## The idea

We built a distribution layer for tokenized DeFi hedged strategies using
Gearbox protocol and the new ERC-4626 vault standard.

In short, with Archimedes users can invest in complex levered strategies with a single click
in a totally permissionless way and enjoy benefits such as liquidation protection and simple analytics.

## Tech Stack

- Contracts: Solidity + Hardhat
- Frontend: NextJS + Chakra-UI with Typescript

## Installation & Test

```bash
git clone git@github.com:FiveElementsLabs/archimedes.git
cd archimedes

yarn install

# frontend
yarn frontend:dev

# contracts
yarn compile

# tests
yarn test
```

## Other Resources

Gearbox:

- <https://github.com/Gearbox-protocol/gearbox-contracts>

ERC-4626:

- <https://eips.ethereum.org/EIPS/eip-4626>
- <https://github.com/Rari-Capital/solmate/blob/main/src/mixins/ERC4626.sol#L177>
- <https://github.com/charmfinance/alpha-vaults-contracts/blob/main/contracts/AlphaVault.sol>
