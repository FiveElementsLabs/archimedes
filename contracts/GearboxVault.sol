// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./tokens/ERC4626.sol";
import "./interfaces/ICreditManager.sol";
import "./interfaces/IYVault.sol";

contract GearboxVault is ERC4626 {
    ///@dev credit account associated with Vault
    address public immutable creditAccount;
    ///@dev gearbox Address Provider
    address public immutable gearboxAddressProviderAddress =
        0xA526311C39523F60b184709227875b5f34793bD4;
    ICreditManager public creditManagerUSDC =
        ICreditManager(0xdBAd1361d9A03B81Be8D3a54Ef0dc9e39a1bA5b3);
    IYVault public immutable yearnAdapter =
        IYVault(0xA526311C39523F60b184709227875b5f34793bD4);

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) public ERC4626(_asset, _name, _symbol) {
        _asset.approve(address(this), 2**256 - 1);
        creditManagerUSDC.openCreditAccount(10e6, msg.sender, 101, 0);
        creditAccount = creditManagerUSDC.creditAccounts(msg.sender);
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
        // get how much yearn token we have
        //yearnAdapter.withdraw((tokens * shares) / totalShares);
    }

    ///@notice do something after withdrawing
    ///@param assets amount of assets
    ///@param shares amount of shares
    function afterDeposit(uint256 assets, uint256 shares) internal override {
        creditManagerUSDC.addCollateral(address(this), address(asset), assets);
        /* function addCollateral(
        address onBehalfOf,
        address token,
        uint256 amount
        ) external override; */

        // Simple strategy 1: Buy gUSDC with USDC
        // (We will get USDC to be deployed to this strategy)
        // Here are the steps:
        // 1. add collateral to vault credit account
        // 2. increase borrowed amount
        // 3. deposit to yearn vault

        creditManagerUSDC.increaseBorrowedAmount(9 * assets);
        yearnAdapter.deposit(10 * assets);
    }
}
