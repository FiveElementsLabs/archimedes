import { ethers, Contract } from "ethers";
import { useSharedState } from "../lib/store";

// ABI
const ERC20_ABI = require("@openzeppelin/contracts/build/contracts/ERC20.json");
const ARCHIMEDES_VAULT_ABI = require("../abi/ArchimedesUSDCVault.json");
const CREDIT_MANAGER_USDC_ABI = require("../abi/CreditManager.json");
const CREDIT_FILTER_USDC_ABI = require("../abi/CreditFilterUSDC.json");

// ADDRESSES (kovan testnet)
const ARCHIMEDES_VAULT_ADDRESS = "0x146C8b6dd3eAaE611f6e74533767A0607c9C919a";
const CREDIT_MANAGER_USDC_ADDRESS =
  "0xdBAd1361d9A03B81Be8D3a54Ef0dc9e39a1bA5b3";
const CREDIT_FILTER_USDC_ADDRESS = "0x6f706028D7779223a51fA015f876364d7CFDD5ee";
const USDC_ADDRESS = "0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df";

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
    const ERC4626: Contract = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ERC20_ABI.abi,
      signer
    );

    const shares = await ERC4626.balanceOf(account);

    console.log(`:: Withdrawing ${shares} USDC`);

    await vault.redeem(Math.ceil(shares - 1000), account, account);
    console.log(`:: Withdrawn ${shares} USDC`);
  };

  const setShares = async () => {
    const signer = await provider.getSigner();
    const ERC4626: Contract = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ERC20_ABI.abi,
      signer
    );

    const shares = await ERC4626.balanceOf(account);

    const supply = await ERC4626.totalSupply();
    return { shares, supply };
  };

  const balanceOf = async () => {
    const signer = await provider.getSigner();

    const creditManagerUSDC = new ethers.Contract(
      CREDIT_MANAGER_USDC_ADDRESS,
      CREDIT_MANAGER_USDC_ABI,
      signer
    );

    const creditAccountAddress = await creditManagerUSDC.creditAccounts(
      ARCHIMEDES_VAULT_ADDRESS
    );

    const creditFilter = new ethers.Contract(
      CREDIT_FILTER_USDC_ADDRESS,
      CREDIT_FILTER_USDC_ABI,
      signer
    );

    const balance = await creditFilter.calcTotalValue(creditAccountAddress);

    console.log(`:: Balance: ${balance} USDC`);
    return balance.toString();
  };

  const healthFactor = async () => {
    const signer = await provider.getSigner();

    const creditManagerUSDC = new ethers.Contract(
      CREDIT_MANAGER_USDC_ADDRESS,
      CREDIT_MANAGER_USDC_ABI,
      signer
    );

    const creditAccountAddress = await creditManagerUSDC.creditAccounts(
      ARCHIMEDES_VAULT_ADDRESS
    );

    const creditFilter = new ethers.Contract(
      CREDIT_FILTER_USDC_ADDRESS,
      CREDIT_FILTER_USDC_ABI,
      signer
    );

    const res = await creditFilter.calcCreditAccountHealthFactor(
      creditAccountAddress
    );
    console.log(`:: HF: ${res}`);
    return (res.toString() / 10000).toFixed(2);
  };

  const currentLeverage = async () => {
    const signer = await provider.getSigner();
    const vault = new ethers.Contract(
      ARCHIMEDES_VAULT_ADDRESS,
      ARCHIMEDES_VAULT_ABI.abi,
      signer
    );

    const res = await vault.levFactor();
    console.log(`:: Leverage: ${res}`);
    return (res / 100 + 1).toFixed(1).toString();
  };

  return {
    deposit,
    withdraw,
    balanceOf,
    healthFactor,
    setShares,
    currentLeverage,
  };
};
