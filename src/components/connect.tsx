import { Button } from "@chakra-ui/react";
import { useSharedState } from "../lib/store";
import { useWallet } from "../hooks/useWallet";
import { shortenAddress } from "../lib/helpers";

export default function Connect(props: any) {
  const [{ account }] = useSharedState();
  const { loginWallet, logoutWallet } = useWallet();

  return (
    <>
      {account ? (
        <Button onClick={logoutWallet} {...props}>
          {shortenAddress(account)}
        </Button>
      ) : (
        <Button onClick={loginWallet} {...props}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}
