// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./tokens/ERC4626.sol";

contract GearboxVault is ERC4626 {
    ///@dev credit account associated with Vault
    address public immutable creditAccount;
    ///@dev gearbox Address Provider
    address public immutable gearboxAddressProviderAddress =
        0xA526311C39523F60b184709227875b5f34793bD4;
        address public immutable creditManagerUSDC = 0x2664cc24cbad28749b3dd6fc97a6b402484de527;
    address public immutable creditManagerWETH =
    address public immutable creditManagerWBTC =
    address public immutable creditManagerDAI = 0x777e23a2acb2fcbb35f6ccf98272d03c722ba6eb;mu

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) public ERC4626(_asset, _name, _symbol) {
        _creditAccount = address(0);
        ///@dev create creditAccount from factory
        //initialize gearboxAddressProvider
        //factoryAddress = addressProvider.getAccountFactory()
        //initialize account factory
    }

    ///@notice return the total amounts of assets
    ///@return total amount of assets
    function totalAssets() public view override returns (uint256) {
        return 1e18; //max amount of underlying asset managed by smart contract
    }

    ///@notice Hook to execute before withdraw
    ///@param assets amount of assets
    ///@param shares amount of shares
    function beforeWithdraw(uint256 assets, uint256 shares) internal override {
        require(true);
    }

    ///@notice do something after withdrawing
    ///@param assets amount of assets
    ///@param shares amount of shares
    function afterDeposit(uint256 assets, uint256 shares) internal override {
        require(true);
    }
}
