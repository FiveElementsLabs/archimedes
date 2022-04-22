import { Contract, ContractFactory } from "ethers";
const { ethers } = require("hardhat");

const Main = async () => {
  const signers = await ethers.getSigners();
  const user = signers[0];

  const SmartVaultFactory = await ethers.getContractFactory("GearboxVault");
  const SmartVault = await SmartVaultFactory.deploy();
  await SmartVault.deployed();
};

Main();
