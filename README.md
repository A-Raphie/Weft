# Weft Protocol

Institutional On-Chain Index & Structured Products Engine on Base.

Weft is an on-chain index fund protocol that enables decentralized, automated, and non-custodial index baskets built upon Coinbase Tokenized Equities (B20) and major DeFi collateral assets on Base L2.

## Key Architecture

- **Core Protocol**: Autonomous basket minting, redeem-in-kind, pro-rata liquidations, and streaming fee accrual.
- **Corporate Action Multipliers**: Native accounting adjustments for forward splits, reverse splits, spinoffs, and synthetic dividend reinvestment.
- **Concentrated Liquidity Routing**: Q64.96 fixed-point router integration with Aerodrome Slipstream and Uniswap v3 on Base.
- **Dynamic Rebalancing**: Dutch auction and constrained quadratic programming solvers for minimal turnover weight alignment.
- **Multi-Oracle Security**: Chainlink primary data streams paired with Pyth pull-oracles, TWAP sanity bounds, and flash-crash circuit breakers.

## Repository Structure

```
├── contracts/          # Core protocol smart contracts (Solidity 0.8.24)
├── test/               # Comprehensive unit, invariant, and scenario fuzzing suites
├── sdk/                # Production TypeScript SDK, Viem client, and indexers
├── analytics/          # Modern Portfolio Theory, Monte Carlo, and Backtest engines
└── scripts/            # High-concurrency transaction simulators and gas benchmarks
```

## Security & Verification

Weft contracts strictly follow invariant-first engineering with extensive formal verification harnesses and zero value destruction proofs across all corporate actions.
