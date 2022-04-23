import { expect } from "chai";
const { ethers } = require("hardhat");
import { Contract, ContractFactory } from "ethers";
const hre = require("hardhat");
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
  let user: any;
  let user2: any;
  let usdcMock: Contract;
  let vault: Contract;
  let ERC4626: Contract;
  let shares: any;

  before("Creating all environment", async function () {
    const signers = await ethers.getSigners();
    user = signers[0];
    user2 = signers[1];
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

    const slot2 = await findbalanceSlot(usdcMock, user2);

    let probedSlot2 = ethers.utils.keccak256(
      encode(["address", "uint"], [user2.address, slot2])
    );
    value = encode(["uint"], [ethers.utils.parseEther("100000000")]);

    await hre.network.provider.send("hardhat_setStorageAt", [
      usdcMock.address,
      probedSlot2,
      value,
    ]);

    const GearboxVaultFactory = await ethers.getContractFactory(
      "LeverageUSDCVault"
    );
    vault = await GearboxVaultFactory.deploy(
      usdcMock.address,
      "USD Coin",
      "USDC"
    );
    await vault.deployed();

    ERC4626 = await ethers.getContractAtFromArtifact(ERC20Json, vault.address);
  });

  describe("LeverageVault", function () {
    it("should create credit account on first use", async function () {
      const amountUsdc: any = 200e6;
      await usdcMock.approve(vault.address, amountUsdc);
      await vault.connect(user).deposit(amountUsdc, user.address);
      console.log("allow");

      expect((await ERC4626.balanceOf(user.address)).toString()).to.eq(
        amountUsdc.toString()
      );
      //check if vault address is linked to a credit account
    });

    it("should add liquidity on second use", async function () {
      const amountUsdc: any = 200e6;
      await usdcMock.approve(vault.address, amountUsdc);
      await vault.connect(user).deposit(amountUsdc, user.address);
      expect((await ERC4626.balanceOf(user.address)).toNumber()).to.gt(
        amountUsdc
      );
    });

    it("should deposit liquidity another user", async function () {
      const amountUsdc: any = 200e6;
      await usdcMock.connect(user2).approve(vault.address, amountUsdc);
      await vault.connect(user2).deposit(amountUsdc, user2.address);
      expect((await ERC4626.balanceOf(user2.address)).toNumber()).to.eq(
        amountUsdc
      );
    });

    it("should withdraw liquidity", async function () {
      const amountUsdc: any = 400e6;
      await usdcMock.approve(vault.address, amountUsdc);
      const shares = (await ERC4626.balanceOf(user.address)).toNumber();
      await vault
        .connect(user)
        .redeem(Math.ceil(shares / 2), user.address, user.address, {
          gasLimit: 3000000,
        });
      expect((await ERC4626.balanceOf(user.address)).toNumber()).to.lt(
        amountUsdc
      );
    });
  });
});
