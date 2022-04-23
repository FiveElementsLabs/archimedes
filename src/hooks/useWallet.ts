import { useState } from "react";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import { useSharedState } from "../lib/store";

export const useWallet = () => {
  const toast = useToast();
  const [, dispatch] = useSharedState();

  const connectMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const account = (await provider.send("eth_requestAccounts", []))[0];

    dispatch({
      type: "LOGIN_WALLET",
      payload: { account, provider },
    });
  };

  const loginWallet = async () => {
    try {
      await connectMetamask();

      toast({
        title: "Wallet Connected",
        description: "You are now connected to your wallet",
        status: "success",
        duration: 5000,
        position: "bottom-right",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const autoLoginWallet = async () => {
    const shouldAutoConnect =
      window.localStorage.getItem("shouldConnectMetamask") === "true";

    if (shouldAutoConnect) {
      await loginWallet();
    }
  };

  const logoutWallet = async () => {
    dispatch({ type: "LOGOUT_WALLET" });
    toast({
      title: "Wallet Disconnected",
      description: "You are now disconnected from your wallet",
      status: "success",
      duration: 5000,
      position: "bottom-right",
    });
  };

  return { loginWallet, autoLoginWallet, logoutWallet };
};
