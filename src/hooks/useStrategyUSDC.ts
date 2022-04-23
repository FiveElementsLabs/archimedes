import { ethers } from "ethers";
import { Contract, ContractFactory } from "ethers";

import { useSharedState } from "../lib/store";

import ARCHIMEDES_VAULT_ABI from "../../artifacts/contracts/LeverageUSDCVault.sol/LeverageUSDCVault.json";
const ERC20_ABI = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const ARCHIMEDES_VAULT_ADDRESS = "0x3aDd51E923D44c70CdF56551b56404209765cbaA";
const YVUSDC_ADDRESS = "0x980E4d8A22105c2a2fA2252B7685F32fc7564512";

export const useStrategyUSDC = () => {
  const [{ account, provider }] = useSharedState();

  const deposit = async (amountUsdc: string) => {
    const signer = await provider.getSigner();
    const vault = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ARCHIMEDES_VAULT_ABI.abi,
      signer
    );
    console.log(`:: Depositing ${amountUsdc} USDC`);

    await vault.deposit(amountUsdc, account);
    console.log(`:: Deposited ${amountUsdc} USDC`);
  };

  const withdraw = async () => {
    const signer = await provider.getSigner();
    const vault = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ARCHIMEDES_VAULT_ABI.abi,
      signer
    );
    const USDC: Contract = new ethers.Contract(
      "0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df",
      ERC20_ABI.abi,
      signer
    );

    const shares = await USDC.balanceOf(account);

    console.log(`:: Withdrawing ${shares} USDC`);

    await vault.redeem(Math.ceil(shares / 2), account, account);
    console.log(`:: Withdrawn ${shares} USDC`);
  };

  const balanceOf = async () => {
    const signer = await provider.getSigner();
    const yusdc = new ethers.Contract(YVUSDC_ADDRESS, ERC20_ABI.abi, signer);

    const balance = (
      await yusdc.balanceOf(ARCHIMEDES_VAULT_ADDRESS)
    ).toNumber();
    console.log(`:: Balance ${balance} USDC`);
    return balance;
  };

  const totalAssets = async () => {};

  const balanceOf4626 = async () => {
    //await ERC4626.balanceOf(user.address)
  };

  const healthFactor = async () => {};

  return { deposit, withdraw, balanceOf };
};
