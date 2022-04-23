// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./tokens/ERC4626.sol";
import "./interfaces/ICreditManager.sol";
import "./interfaces/IYVault.sol";
import "./interfaces/ICreditFilter.sol";
import "hardhat/console.sol";

contract HedgedOptionVault is ERC4626 {
    ///@dev credit account associated with Vault
    address public creditAccount = address(0);
    ICreditManager public creditManagerUSDC =
        ICreditManager(0xdBAd1361d9A03B81Be8D3a54Ef0dc9e39a1bA5b3);
    IYVault public immutable yearnAdapter =
        IYVault(0x0B21A1C329D75803d47cdc2FDB1c1A82863297FE);
    ICreditFilter public creditFilter =
        ICreditFilter(0x6f706028D7779223a51fA015f876364d7CFDD5ee);
    uint256 yearnBalance = 0;

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) public ERC4626(_asset, _name, _symbol) {}

    ///@notice return the total amount of collaterall from gearbox
    ///@return total amount of assets
    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this));
    }

    ///@notice Hook to execute before withdraw
    ///@param assets amount of assets
    ///@param shares amount of shares
    function beforeWithdraw(uint256 assets, uint256 shares) internal override {
        //withdraw all
        //redeposit all the stuff minus the assets to withdraw
        yearnBalance -= yearnAdapter.withdraw(yearnBalance, address(this));
        creditManagerUSDC.repayCreditAccount(address(this));
        //redeposit
        _getCreditAccount(asset.balanceOf(address(this)) - assets);
    }

    ///@notice do something after withdrawing
    ///@param assets amount of assets
    ///@param shares amount of shares
    function afterDeposit(uint256 assets, uint256 shares) internal override {
        ///@dev open credit manager if it does not exist
        asset.approve(address(creditManagerUSDC), 2**256 - 1);
        if (!_getCreditAccount(assets)) {
            creditManagerUSDC.addCollateral(
                address(this),
                address(asset),
                assets
            );
            console.log("after add collateral");
            creditManagerUSDC.increaseBorrowedAmount(4 * assets);
            console.log("after increase borrowd");
        }
        console.log(yearnAdapter.yVault());
        console.log(creditFilter.isTokenAllowed(yearnAdapter.yVault()));
        console.log("pre deposit yearn");
        yearnBalance += yearnAdapter.deposit();
        console.log("deposited to yearn");
    }

    ///@notice create open credit account if it doesnt exist and do nothing if it exists
    ///@return bool true if i had opened creditManager, else if not
    function _getCreditAccount(uint256 assets) internal returns (bool) {
        if (creditAccount == address(0)) {
            creditManagerUSDC.openCreditAccount(assets, address(this), 400, 0);
            console.log("ho creato laccount");
            creditAccount = creditManagerUSDC.creditAccounts(address(this));
            console.log("get credit account");
            return true;
        } else return false;
    }

    //Health factor computation
    function _getHealthFactor() internal view returns (uint256) {
        ICreditFilter creditFilter = ICreditFilter(
            creditManagerUSDC.creditFilter()
        );
        uint256 healthFactor = creditFilter.calcCreditAccountHealthFactor(
            address(creditFilter)
        );
    }
}
