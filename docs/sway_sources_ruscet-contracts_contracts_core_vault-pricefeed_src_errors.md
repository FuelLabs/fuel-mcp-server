# Example: sway_sources/ruscet-contracts/contracts/core/vault-pricefeed/src/errors.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub enum Error {
    VaultPriceFeedAlreadyInitialized: (),
    VaultPriceFeedForbidden: (),

    VaultPriceFeedInvalidPrice: (),
    VaultPriceFeedInvalidPriceFeed: (),
    VaultPriceFeedInvalidPriceFeedToUpdate: (),

    VaultPriceFeedPriceIsAhead: (),
    VaultPriceFeedPriceIsStale: (),

    VaultPriceFeedCouldNotFetchPrice: (),

    VaultPriceFeedInvalidSignature: (),
    VaultPriceFeedSignatureAlreadyUsed: (),
    VaultPriceFeedInvalidMessageTimestamp: (),
}
```
