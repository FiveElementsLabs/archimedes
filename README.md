<h1 align="center">Archimedes</h1>

![Archimedes Strategy page](https://user-images.githubusercontent.com/48695862/165321633-5c478efb-283a-494b-a153-3b717d8d14aa.png)

> Archimedes is an ETH Amsterdam hackaton project made by [Five Elements Labs](https://fiveelementslabs.com/)

**🏆 Update: Archimedes won the 1st prize for Gearbox Protocol, Yearn Finance and Tribe DAO.**

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
# add a .env file according to the .env.example
yarn test
```

## Useful Resources

Gearbox:

- <https://github.com/Gearbox-protocol/gearbox-contracts>

ERC-4626:

- <https://eips.ethereum.org/EIPS/eip-4626>
- <https://github.com/Rari-Capital/solmate/blob/main/src/mixins/ERC4626.sol#L177>
- <https://github.com/charmfinance/alpha-vaults-contracts/blob/main/contracts/AlphaVault.sol>

## Recognition

![Yearn finance tweet](https://user-images.githubusercontent.com/48695862/165321620-ee212340-4ddd-4b5b-971a-63f5a660ff0b.png)
