// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./tokens/ERC4626.sol";
import "./interfaces/ICreditManager.sol";
import "./interfaces/IYVault.sol";
import "./interfaces/ICreditFilter.sol";
import "hardhat/console.sol";

contract LeverageUSDCVault is ERC4626 {
    ///@dev credit account associated with Vault
    address public creditAccount = address(0);
    address public owner;
    ICreditManager public creditManagerUSDC =
        ICreditManager(0xdBAd1361d9A03B81Be8D3a54Ef0dc9e39a1bA5b3);
    IYVault public immutable yearnAdapter =
        IYVault(0x7DE5C945692858Cef922DAd3979a1B8bfA77A9B4);
    ICreditFilter public creditFilter =
        ICreditFilter(0x6f706028D7779223a51fA015f876364d7CFDD5ee);
    ERC20 yvUSDC = ERC20(0x980E4d8A22105c2a2fA2252B7685F32fc7564512);
    ERC20 USDC = ERC20(0x31EeB2d0F9B6fD8642914aB10F4dD473677D80df);
    // Leverage Factor
    uint256 public levFactor = 300;
    uint256 public criticalHealthFactor;

    //uint256 public entryFee;
    //uint256 public entryFeeMax = 100;

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol,
        uint256 _criticalHealthfactor //uint256 _entryFee
    ) public ERC4626(_asset, _name, _symbol) {
        owner = msg.sender;
        criticalHealthFactor = _criticalHealthfactor;
        //entryFee = _entryFee;
    }

    ///@notice return the total amount of collateral from gearbox
    ///@return total amount of assets
    function totalAssets() public view override returns (uint256) {
        if (creditAccount == address(0)) return 1;
        uint256 total = creditFilter.calcTotalValue(address(creditAccount));
        return (total * 100) / (levFactor + 100); //TODO: check slippage difference in value
    }

    ///@notice Hook to execute before withdraw
    ///@param assets amount of assets
    ///@param shares amount of shares
    function beforeWithdraw(uint256 assets, uint256 shares) internal override {
        //withdraw all
        //redeposit all the stuff minus the assets to withdraw
        yearnAdapter.withdraw();
        creditManagerUSDC.repayCreditAccount(address(this));
        creditAccount = address(0);
        //redeposit
        if (asset.balanceOf(address(this)) > assets) {
            afterDeposit(asset.balanceOf(address(this)) - assets, shares);
        }
    }

    ///@notice do something after withdrawing
    ///@param assets amount of assets
    ///@param shares amount of shares
    function afterDeposit(uint256 assets, uint256 shares) internal override {
        ///@dev open credit manager if it does not exist
        console.log("inside deposit");
        console.log(address(creditAccount));
        //asset.approve(owner, assets*entryFee/10000);
        //asset.safeTransferFrom(address(this), owner, assets*entryFee/10000);
        asset.approve(address(creditManagerUSDC), 2**256 - 1);
        if (!_getCreditAccount(assets)) {
            creditManagerUSDC.addCollateral(
                address(this),
                address(asset),
                assets
            );
            creditManagerUSDC.increaseBorrowedAmount(
                (levFactor * assets) / 100
            );
        }
        console.log(address(creditAccount));
        yearnAdapter.deposit();
    }

    ///@notice create open credit account if it doesnt exist and do nothing if it exists
    ///@return bool true if i had opened creditManager, else if not
    function _getCreditAccount(uint256 assets) internal returns (bool) {
        if (creditAccount == address(0)) {
            creditManagerUSDC.openCreditAccount(
                assets,
                address(this),
                levFactor,
                0
            );
            creditAccount = creditManagerUSDC.creditAccounts(address(this));
            return true;
        } else return false;
    }

    //Health factor computation
    function _getHealthFactor() internal view returns (uint256) {
        return
            creditFilter.calcCreditAccountHealthFactor(address(creditAccount));
    }

    // Close position and reopen with lower leverage
    function decreaseLeverage() external onlyShareholder {
        require(_getHealthFactor() < criticalHealthFactor);
        yearnAdapter.withdraw();
        creditManagerUSDC.repayCreditAccount(address(this));
        levFactor -= 10;
        afterDeposit(asset.balanceOf(address(this)), 0);
    }

    modifier onlyShareholder() {
        require(
            balanceOf[msg.sender] > 0,
            "Only Shareholder can call this function"
        );
        _;
    }
}
