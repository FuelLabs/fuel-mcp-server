# Example: sway_sources/ruscet-contracts/contracts/mocks/mock-vault-pricefeed/src/constants.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub const BASIS_POINTS_DIVISOR: u256 = 10_000;
pub const PRICE_PRECISION: u256 = 0xC9F2C9CD04674EDEA40000000u256; // 10 ** 30;
pub const ONE_USD: u256 = PRICE_PRECISION;
pub const MAX_SPREAD_BASIS_POINTS: u64 = 50;
pub const MAX_ADJUSTMENT_INTERVAL: u64 = 7200; // 2 hours
pub const MAX_ADJUSTMENT_BASIS_POINTS: u64 = 20;
```
