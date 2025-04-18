# Example: sway_sources/ruscet-contracts/contracts/assets/time-distributor/src/errors.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub enum Error {
    TimeDistributorAlreadyInitialized: (),
    TimeDistributorForbidden: (),

    TimeDistributorPendingDistribution: (),
    TimeDistributorInvalidLen: (),
}
```
