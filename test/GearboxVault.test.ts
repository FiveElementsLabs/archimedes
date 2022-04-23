import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { hexZeroPad } from "ethers/lib/utils";
import { ethers } from "hardhat";
import hre from "hardhat";
import "mocha";

const ERC20Json = require("@openzeppelin/contracts/build/contracts/ERC20.json");

//find the slot in memory of the balance of the tokenAddress and return it
async function findbalanceSlot(MockToken: any, user: any) {
  const encode = (types: any, values: any) =>
    ethers.utils.defaultAbiCoder.encode(types, values);
  const account = user.address;
  for (let i = 0; i < 100; i++) {
    let balanceSlot = ethers.utils.keccak256(
      encode(["address", "uint"], [account, i])
    );
    // remove padding for JSON RPC
    while (balanceSlot.startsWith("0x0"))
      balanceSlot = "0x" + balanceSlot.slice(3);
    const previusValue = await hre.network.provider.send("eth_getStorageAt", [
      MockToken.address,
      balanceSlot,
      "latest",
    ]);
    // make sure the probe will change the slot value
    const balanceToTest =
      previusValue === encode(["uint"], [10])
        ? encode(["uint"], [2])
        : encode(["uint"], [10]);

    await hre.network.provider.send("hardhat_setStorageAt", [
      MockToken.address,
      balanceSlot,
      balanceToTest,
    ]);

    const balance = await MockToken.balanceOf(account);
    // reset to previous value
    if (!balance.eq(ethers.BigNumber.from(balanceToTest)))
      await hre.network.provider.send("hardhat_setStorageAt", [
        MockToken.address,
        balanceSlot,
        previusValue,
      ]);
    if (balance.eq(ethers.BigNumber.from(balanceToTest))) return i;
  }
}

describe("GearboxVault Deployment", function () {
  let user;
  let usdcMock;
  let vault;

  before("Creating all environment", async function () {
    const signers = await ethers.getSigners();
    user = signers[0];
    //Get mock token
    usdcMock = await ethers.getContractAtFromArtifact(
      ERC20Json,
      "0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df"
    );

    //mint some token

    const slot = await findbalanceSlot(usdcMock, user);

    const encode = (types: any, values: any) =>
      ethers.utils.defaultAbiCoder.encode(types, values);

    let probedSlot = ethers.utils.keccak256(
      encode(["address", "uint"], [user.address, slot])
    );
    let value = encode(["uint"], [ethers.utils.parseEther("100000000")]);

    await hre.network.provider.send("hardhat_setStorageAt", [
      usdcMock.address,
      probedSlot,
      value,
    ]);

    console.log(await usdcMock.balanceOf(user.address));

    const GearboxVaultFactory = await ethers.getContractFactory("LeverageUSDC");
    vault = await GearboxVaultFactory.deploy(
      usdcMock.address,
      "GearboxVault",
      "GBV"
    );
    await vault.deployed();
  });
});
