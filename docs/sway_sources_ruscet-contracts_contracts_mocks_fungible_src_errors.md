# Example: sway_sources/ruscet-contracts/contracts/mocks/fungible/src/errors.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub enum Error {
    FungibleAlreadyInitialized: (),
    FungibleNameAlreadySet: (),
    FungibleSymbolAlreadySet: (),
    FungibleDecimalsAlreadySet: (),

    FungibleBurnInsufficientAssetForwarded: (),
    FungibleBurnInsufficientAmountForwarded: (),

    FungibleInsufficientAssetForwarded: (),
    FungibleInsufficientAmountForwarded: (),
}

```
