# Example: sway_sources/ruscet-contracts/contracts/core/vault/src/constants.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub const BASIS_POINTS_DIVISOR: u64 = 10_000;
pub const FUNDING_RATE_PRECISION: u256 = 1_000_000;
pub const PRICE_PRECISION: u256 = 0xC9F2C9CD04674EDEA40000000u256; // 10 ** 30;
pub const MIN_LEVERAGE: u64 = 10_000; // 1x
pub const RUSD_DECIMALS: u32 = 9;
pub const MAX_FEE_BASIS_POINTS: u64 = 500; // 5%
pub const DEFAULT_LIQUIDATION_FEE_USD: u256 = 0x3F1BDF10116048A59340000000u256; // 5 USD (5 * PRICE_PRECISION)
pub const MAX_LIQUIDATION_FEE_USD: u256 = 0x4EE2D6D415B85ACEF8100000000u256; // 100 USD (100 * PRICE_PRECISION)
pub const MIN_FUNDING_RATE_INTERVAL: u64 = 3_600; // 1 hour
pub const MAX_FUNDING_RATE_FACTOR: u64 = 10_000; // 1%
```
