import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useSharedState } from "../lib/store";
import { useWallet } from "../hooks/useWallet";
import { shortenAddress } from "../lib/helpers";
import { CaretDown } from "phosphor-react";
import networks from "../lib/networks";

export default function Connect(props: any) {
  const [{ account, network_name }] = useSharedState();
  const { loginWallet, logoutWallet, changeNetwork } = useWallet();

  return (
    <>
      {network_name && (
        <Menu>
          <MenuButton as={Button} rightIcon={<CaretDown />}>
            {network_name}
          </MenuButton>
          <MenuList>
            {Object.keys(networks).map((key: string) => (
              <MenuItem
                key={key}
                onClick={async () => await changeNetwork(key)}
              >
                {(networks as any)[key].chainName}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
      {account ? (
        <Button ml={2} onClick={logoutWallet} {...props}>
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
