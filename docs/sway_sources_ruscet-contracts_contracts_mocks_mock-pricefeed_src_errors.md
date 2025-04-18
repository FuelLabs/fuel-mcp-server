# Example: sway_sources/ruscet-contracts/contracts/mocks/mock-pricefeed/src/errors.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub enum Error {
    PriceFeedAlreadyInitialized: (),
    PricefeedGovZero: (),
    PricefeedForbidden: (),
    PricefeedRoundNotComplete: (),
}
```
