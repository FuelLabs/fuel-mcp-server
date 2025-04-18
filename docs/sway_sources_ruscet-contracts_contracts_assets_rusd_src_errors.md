# Example: sway_sources/ruscet-contracts/contracts/assets/rusd/src/errors.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub enum Error {
    RUSDAlreadyInitialized: (),
    RUSDForbidden: (),
    RUSDAccountNotMarked: (),

    RUSDInvalidSignature: (),
    RUSDMintZeroAmount: (),

    RUSDInvalidBurnAssetForwarded: (),
    RUSDInvalidBurnAmountForwarded: (),

    RUSDMintToZeroAccount: (),
    RUSDBurnFromZeroAccount: (),
}
```
