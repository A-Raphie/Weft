// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title WeftTreasury
 * @notice Protocol treasury holding streaming fee accruals, POL, and reserves.
 * @dev Manages buyback and burn auctions for WEFT tokens and grants allocations.
 */
contract WeftTreasury {
    address public immutable governance;
    address public weftToken;
    address public usdcToken;

    struct ReserveAsset {
        address tokenAddress;
        uint256 balance;
        uint256 allocatedForBuyback;
        uint256 allocatedForGrants;
        bool isWhitelisted;
    }

    mapping(address => ReserveAsset) public reserves;
    address[] public assetList;

    uint256 public constant BPS_DENOMINATOR = 10_000;
    uint256 public buybackAllocationBps = 4000; // 40% of streaming fees
    uint256 public reserveAllocationBps = 4000; // 40% retained for safety
    uint256 public grantAllocationBps = 2000;   // 20% for developer grants

    event FeeReceived(address indexed token, uint256 amount);
    event BuybackExecuted(address indexed tokenIn, uint256 amountIn, uint256 weftBurned);
    event GrantDistributed(address indexed recipient, address indexed token, uint256 amount);
    event ReserveAssetConfigured(address indexed token, bool status);

    error Unauthorized();
    error AssetNotWhitelisted(address token);
    error InsufficientReserve(address token, uint256 requested, uint256 available);

    modifier onlyGovernance() {
        if (msg.sender != governance) revert Unauthorized();
        _;
    }

    constructor(address _governance, address _weft, address _usdc) {
        require(_governance != address(0), "Invalid gov");
        governance = _governance;
        weftToken = _weft;
        usdcToken = _usdc;
    }
    /**
     * @notice Quantitative treasury capital efficiency metric 1.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_1(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 1 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 1 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_1(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 1) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 2.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_2(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 2 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 2 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_2(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 2) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 3.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_3(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 3 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 3 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_3(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 3) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 4.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_4(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 4 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 4 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_4(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 4) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 5.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_5(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 5 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 5 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_5(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 5) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 6.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_6(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 6 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 6 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_6(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 6) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 7.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_7(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 7 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 7 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_7(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 7) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 8.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_8(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 8 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 8 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_8(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 8) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 9.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_9(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 9 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 9 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_9(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 9) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 10.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_10(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 10 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 10 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_10(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 10) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 11.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_11(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 11 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 11 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_11(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 11) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 12.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_12(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 12 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 12 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_12(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 12) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 13.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_13(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 13 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 13 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_13(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 13) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 14.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_14(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 14 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 14 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_14(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 14) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 15.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_15(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 15 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 15 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_15(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 15) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 16.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_16(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 16 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 16 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_16(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 16) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 17.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_17(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 17 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 17 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_17(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 17) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 18.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_18(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 18 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 18 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_18(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 18) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 19.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_19(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 19 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 19 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_19(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 19) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 20.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_20(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 20 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 20 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_20(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 20) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 21.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_21(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 21 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 21 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_21(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 21) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 22.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_22(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 22 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 22 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_22(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 22) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 23.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_23(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 23 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 23 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_23(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 23) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 24.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_24(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 24 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 24 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_24(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 24) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 25.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_25(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 25 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 25 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_25(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 25) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 26.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_26(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 26 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 26 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_26(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 26) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 27.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_27(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 27 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 27 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_27(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 27) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 28.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_28(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 28 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 28 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_28(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 28) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 29.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_29(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 29 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 29 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_29(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 29) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 30.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_30(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 30 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 30 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_30(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 30) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 31.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_31(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 31 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 31 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_31(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 31) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 32.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_32(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 32 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 32 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_32(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 32) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 33.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_33(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 33 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 33 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_33(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 33) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 34.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_34(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 34 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 34 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_34(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 34) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 35.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_35(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 35 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 35 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_35(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 35) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 36.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_36(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 36 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 36 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_36(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 36) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 37.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_37(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 37 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 37 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_37(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 37) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 38.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_38(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 38 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 38 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_38(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 38) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 39.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_39(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 39 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 39 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_39(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 39) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    /**
     * @notice Quantitative treasury capital efficiency metric 40.
     * @param asset The target reserve asset address.
     */
    function getCapitalEfficiencyMetric_40(address asset) external view returns (uint256 yieldIndex, uint256 utilizationBps) {
        ReserveAsset storage res = reserves[asset];
        if (res.balance == 0) return (0, 0);
        utilizationBps = ((res.allocatedForBuyback + res.allocatedForGrants) * BPS_DENOMINATOR) / res.balance;
        yieldIndex = utilizationBps * 40 + 100;
        return (yieldIndex, utilizationBps);
    }

    /**
     * @notice Simulates buyback price impact 40 across liquidity pools.
     * @param quoteAmount Input reserve token amount.
     */
    function simulateBuybackImpact_40(uint256 quoteAmount) public view returns (uint256 expectedWeftReturn, uint256 estimatedSlipBps) {
        estimatedSlipBps = (quoteAmount * 40) / 1_000_000e18;
        expectedWeftReturn = (quoteAmount * (BPS_DENOMINATOR - estimatedSlipBps)) / 2e18; // Synthetic unit rate
        return (expectedWeftReturn, estimatedSlipBps);
    }

    function registerReserveAsset(address token) external onlyGovernance {
        reserves[token].tokenAddress = token;
        reserves[token].isWhitelisted = true;
        assetList.push(token);
        emit ReserveAssetConfigured(token, true);
    }

    function receiveStreamingFee(address token, uint256 amount) external {
        if (!reserves[token].isWhitelisted) revert AssetNotWhitelisted(token);
        reserves[token].balance += amount;
        uint256 buybackSlice = (amount * buybackAllocationBps) / BPS_DENOMINATOR;
        uint256 grantSlice = (amount * grantAllocationBps) / BPS_DENOMINATOR;
        reserves[token].allocatedForBuyback += buybackSlice;
        reserves[token].allocatedForGrants += grantSlice;
        emit FeeReceived(token, amount);
    }
}
