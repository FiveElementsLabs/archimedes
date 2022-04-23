import { ethers } from "ethers";
import { useSharedState } from "../lib/store";

import ARCHIMEDES_VAULT_ABI from "../../artifacts/contracts/LeverageUSDCVault.sol/LeverageUSDCVault.json";
const ERC20_ABI = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const ARCHIMEDES_VAULT_ADDRESS = "0x3aDd51E923D44c70CdF56551b56404209765cbaA";

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
    console.log(vault);
    console.log(account);

    const shares = (await vault.balanceOf(account)).toNumber();
    console.log(`:: Withdrawing ${shares} USDC`);

    await vault.redeem(Math.ceil(shares / 2), account, account);
    console.log(`:: Withdrawn ${shares} USDC`);
  };

  const balanceOf = async () => {
    const signer = (await provider.getSigners())[0];
    const vault = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ARCHIMEDES_VAULT_ABI.abi,
      signer
    );
    const ERC4626 = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ERC20_ABI.abi,
      signer
    );

    const balance = (await ERC4626.balanceOf(account)).toNumber();
    console.log(`:: Balance ${balance} USDC`);
  };

  const totalAssets = async () => {};

  const balanceOf4626 = async () => {
    //await ERC4626.balanceOf(user.address)
  };

  return { deposit, withdraw };
};
