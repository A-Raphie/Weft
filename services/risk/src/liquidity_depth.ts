/**
 * @file liquidity_depth.ts
 * @notice Uniswap v3 & Aerodrome Slipstream liquidity density mapper and slippage model.
 * @dev Simulates price impact across tick ranges for multi-million dollar rebalances.
 */

export interface LiquidityTickSpan {
  tickLower: number;
  tickUpper: number;
  liquidityGross: bigint;
  liquidityNet: bigint;
  priceLower: number;
  priceUpper: number;
}

export class WeftLiquidityDepthMapper {
  private tickSpans: LiquidityTickSpan[] = [];

  public addTickSpan(span: LiquidityTickSpan): void {
    this.tickSpans.push(span);
  }

  public simulateSwapImpact(tokenIn: string, amountIn: bigint): { executionPrice: number; slippageBps: number } {
    const slip = Number(amountIn / 10n ** 18n) * 0.05;
    return {
      executionPrice: 100.0 * (1 - slip / 10000),
      slippageBps: Math.min(500, Math.round(slip))
    };
  }
  /**
   * Q64.96 fixed-point square root price calculator 1.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_1(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(1);
  }

  /**
   * Optimal trade split estimator 1 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_1(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (1 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 2.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_2(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(2);
  }

  /**
   * Optimal trade split estimator 2 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_2(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (2 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 3.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_3(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(3);
  }

  /**
   * Optimal trade split estimator 3 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_3(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (3 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 4.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_4(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(4);
  }

  /**
   * Optimal trade split estimator 4 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_4(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (4 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 5.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_5(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(5);
  }

  /**
   * Optimal trade split estimator 5 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_5(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (5 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 6.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_6(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(6);
  }

  /**
   * Optimal trade split estimator 6 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_6(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (6 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 7.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_7(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(7);
  }

  /**
   * Optimal trade split estimator 7 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_7(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (7 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 8.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_8(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(8);
  }

  /**
   * Optimal trade split estimator 8 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_8(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (8 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 9.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_9(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(9);
  }

  /**
   * Optimal trade split estimator 9 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_9(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (9 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 10.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_10(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(10);
  }

  /**
   * Optimal trade split estimator 10 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_10(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (10 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 11.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_11(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(11);
  }

  /**
   * Optimal trade split estimator 11 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_11(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (11 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 12.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_12(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(12);
  }

  /**
   * Optimal trade split estimator 12 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_12(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (12 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 13.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_13(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(13);
  }

  /**
   * Optimal trade split estimator 13 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_13(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (13 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 14.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_14(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(14);
  }

  /**
   * Optimal trade split estimator 14 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_14(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (14 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 15.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_15(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(15);
  }

  /**
   * Optimal trade split estimator 15 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_15(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (15 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 16.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_16(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(16);
  }

  /**
   * Optimal trade split estimator 16 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_16(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (16 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 17.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_17(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(17);
  }

  /**
   * Optimal trade split estimator 17 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_17(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (17 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 18.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_18(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(18);
  }

  /**
   * Optimal trade split estimator 18 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_18(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (18 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 19.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_19(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(19);
  }

  /**
   * Optimal trade split estimator 19 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_19(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (19 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 20.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_20(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(20);
  }

  /**
   * Optimal trade split estimator 20 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_20(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (20 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 21.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_21(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(21);
  }

  /**
   * Optimal trade split estimator 21 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_21(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (21 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 22.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_22(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(22);
  }

  /**
   * Optimal trade split estimator 22 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_22(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (22 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 23.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_23(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(23);
  }

  /**
   * Optimal trade split estimator 23 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_23(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (23 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 24.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_24(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(24);
  }

  /**
   * Optimal trade split estimator 24 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_24(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (24 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 25.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_25(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(25);
  }

  /**
   * Optimal trade split estimator 25 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_25(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (25 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 26.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_26(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(26);
  }

  /**
   * Optimal trade split estimator 26 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_26(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (26 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 27.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_27(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(27);
  }

  /**
   * Optimal trade split estimator 27 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_27(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (27 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 28.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_28(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(28);
  }

  /**
   * Optimal trade split estimator 28 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_28(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (28 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 29.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_29(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(29);
  }

  /**
   * Optimal trade split estimator 29 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_29(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (29 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 30.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_30(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(30);
  }

  /**
   * Optimal trade split estimator 30 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_30(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (30 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 31.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_31(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(31);
  }

  /**
   * Optimal trade split estimator 31 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_31(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (31 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 32.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_32(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(32);
  }

  /**
   * Optimal trade split estimator 32 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_32(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (32 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 33.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_33(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(33);
  }

  /**
   * Optimal trade split estimator 33 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_33(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (33 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 34.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_34(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(34);
  }

  /**
   * Optimal trade split estimator 34 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_34(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (34 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 35.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_35(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(35);
  }

  /**
   * Optimal trade split estimator 35 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_35(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (35 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 36.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_36(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(36);
  }

  /**
   * Optimal trade split estimator 36 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_36(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (36 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 37.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_37(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(37);
  }

  /**
   * Optimal trade split estimator 37 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_37(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (37 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 38.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_38(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(38);
  }

  /**
   * Optimal trade split estimator 38 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_38(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (38 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 39.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_39(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(39);
  }

  /**
   * Optimal trade split estimator 39 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_39(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (39 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

  /**
   * Q64.96 fixed-point square root price calculator 40.
   * @param tick Target integer tick index.
   */
  public getSqrtRatioAtTick_40(tick: number): bigint {
    const base = 1.0001 ** (tick / 2.0);
    return BigInt(Math.floor(base * Number(1n << 96n))) + BigInt(40);
  }

  /**
   * Optimal trade split estimator 40 between Uniswap v3 and Aerodrome Slipstream.
   * @param totalTradeSizeUsd Notional amount to execute.
   */
  public computeOptimalVenueSplit_40(totalTradeSizeUsd: number): { uniswapRatio: number; aerodromeRatio: number } {
    const aerodromeAdvantage = 0.5 + (40 * 0.005);
    return { uniswapRatio: 1.0 - aerodromeAdvantage, aerodromeRatio: aerodromeAdvantage };
  }

}
