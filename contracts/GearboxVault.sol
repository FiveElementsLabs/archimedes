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
        IYVault(0x0B21A1C329D75803d47cdc2FDB1c1A82863297FE);

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) public ERC4626(_asset, _name, _symbol) {
        _asset.approve(address(this), 2**256 - 1);
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
        require(true); //timelock
        uint256 yearnBalance = 0;
        if (yearnBalance > 0) {
            yearnAdapter.withdraw(yearnBalance, address(this));
        }
        // get how much yearn token we have
        asset.safeTransfer(msg.sender, convertToAssets(shares));
    }

    ///@notice do something after withdrawing
    ///@param assets amount of assets
    ///@param shares amount of shares
    function afterDeposit(uint256 assets, uint256 shares) internal override {
        ///@dev open credit manager if it doesnt exist
        if (!_getCreditAccount(creditManagerUSDC)) {
            creditManagerUSDC.addCollateral(
                address(this),
                address(asset),
                assets
            );
            creditManagerUSDC.increaseBorrowedAmount(4 * assets);
        }
        yearnAdapter.deposit(5 * assets);
    }

    ///@notice create open credit account if it doesnt exist and do nothing if it exists
    ///@param creditManagerUSDC creditManagerUSDC from gearbox
    ///@return bool true if i had opened creditManager, else if not
    function _getCreditAccount(ICreditManager creditManagerUSDC)
        internal
        returns (bool)
    {
        ///@dev open credit manager if it doesnt exist
        if (creditManagerUSDC.hasOpenedCreditAccount(address(this))) {
            creditManagerUSDC.openCreditAccount(assets, address(this), 500, 0);
            return true;
        } else return false;
    }
}
