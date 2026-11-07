/**
 * @file rebalance_monitor.ts
 * @notice Real-time tracking of portfolio allocation drift against target index weights.
 * @dev Triggers automated Dutch auction launches when tracking divergence exceeds threshold.
 */

export interface ConstituentWeight {
  tokenAddress: string;
  symbol: string;
  targetWeightBps: number;
  currentWeightBps: number;
  driftBps: number;
  lastUpdatedBlock: bigint;
}

export interface DriftAnalysisResult {
  rebalanceNeeded: boolean;
  maxDriftComponent: string;
  totalDriftBps: number;
  constituents: ConstituentWeight[];
  recommendedAuctionBatches: Array<{ token: string; sellAmount: bigint; buyAmount: bigint }>;
}

export class WeftRebalanceMonitor {
  private driftThresholdBps: number;
  private constituents: Map<string, ConstituentWeight> = new Map();

  constructor(driftThresholdBps: number = 50) {
    this.driftThresholdBps = driftThresholdBps;
  }

  public registerConstituent(token: string, symbol: string, targetBps: number): void {
    this.constituents.set(token, {
      tokenAddress: token,
      symbol,
      targetWeightBps: targetBps,
      currentWeightBps: targetBps,
      driftBps: 0,
      lastUpdatedBlock: 0n
    });
  }

  public updateWeights(token: string, currentBps: number, blockNumber: bigint): void {
    const c = this.constituents.get(token);
    if (!c) return;
    c.currentWeightBps = currentBps;
    c.driftBps = Math.abs(currentBps - c.targetWeightBps);
    c.lastUpdatedBlock = blockNumber;
  }

  public evaluateDrift(): DriftAnalysisResult {
    let totalDrift = 0;
    let maxDrift = 0;
    let worstToken = "";
    const list: ConstituentWeight[] = [];

    for (const [token, c] of this.constituents.entries()) {
      totalDrift += c.driftBps;
      if (c.driftBps > maxDrift) {
        maxDrift = c.driftBps;
        worstToken = token;
      }
      list.push({ ...c });
    }

    return {
      rebalanceNeeded: maxDrift >= this.driftThresholdBps,
      maxDriftComponent: worstToken,
      totalDriftBps: totalDrift,
      constituents: list,
      recommendedAuctionBatches: []
    };
  }
  /**
   * Parametric drift sensitivity calculator 1 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_1(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (1 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 1 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_1(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (1 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 2 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_2(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (2 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 2 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_2(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (2 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 3 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_3(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (3 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 3 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_3(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (3 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 4 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_4(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (4 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 4 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_4(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (4 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 5 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_5(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (5 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 5 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_5(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (5 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 6 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_6(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (6 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 6 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_6(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (6 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 7 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_7(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (7 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 7 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_7(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (7 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 8 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_8(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (8 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 8 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_8(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (8 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 9 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_9(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (9 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 9 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_9(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (9 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 10 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_10(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (10 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 10 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_10(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (10 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 11 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_11(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (11 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 11 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_11(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (11 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 12 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_12(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (12 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 12 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_12(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (12 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 13 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_13(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (13 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 13 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_13(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (13 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 14 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_14(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (14 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 14 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_14(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (14 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 15 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_15(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (15 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 15 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_15(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (15 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 16 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_16(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (16 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 16 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_16(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (16 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 17 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_17(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (17 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 17 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_17(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (17 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 18 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_18(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (18 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 18 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_18(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (18 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 19 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_19(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (19 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 19 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_19(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (19 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 20 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_20(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (20 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 20 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_20(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (20 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 21 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_21(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (21 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 21 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_21(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (21 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 22 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_22(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (22 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 22 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_22(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (22 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 23 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_23(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (23 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 23 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_23(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (23 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 24 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_24(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (24 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 24 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_24(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (24 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 25 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_25(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (25 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 25 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_25(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (25 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 26 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_26(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (26 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 26 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_26(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (26 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 27 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_27(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (27 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 27 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_27(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (27 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 28 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_28(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (28 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 28 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_28(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (28 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 29 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_29(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (29 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 29 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_29(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (29 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 30 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_30(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (30 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 30 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_30(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (30 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 31 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_31(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (31 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 31 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_31(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (31 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 32 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_32(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (32 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 32 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_32(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (32 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 33 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_33(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (33 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 33 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_33(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (33 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 34 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_34(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (34 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 34 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_34(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (34 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 35 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_35(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (35 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 35 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_35(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (35 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 36 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_36(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (36 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 36 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_36(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (36 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 37 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_37(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (37 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 37 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_37(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (37 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 38 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_38(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (38 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 38 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_38(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (38 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 39 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_39(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (39 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 39 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_39(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (39 % 8));
    return lotSizeUnits / divisor;
  }

  /**
   * Parametric drift sensitivity calculator 40 with non-linear liquidity dampener.
   * @param baseDeviationBps Unadjusted weight divergence in bps.
   */
  public computeAdjustedDeviationScore_40(baseDeviationBps: number): number {
    const dampening = 1.0 / (1.0 + (40 * 0.02));
    const scaled = baseDeviationBps * dampening;
    return Math.round(scaled * 100) / 100;
  }

  /**
   * Optimal auction step size estimator 40 to minimize market impact.
   * @param lotSizeUnits Total tokens required to rebalance.
   */
  public estimateOptimalAuctionLotSize_40(lotSizeUnits: bigint): bigint {
    const divisor = BigInt(4 + (40 % 8));
    return lotSizeUnits / divisor;
  }

}
