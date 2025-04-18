# Example: sway_sources/ruscet-contracts/contracts/core/shorts-tracker/src/errors.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub enum Error {
    ShortsTrackerAlreadyInitialized: (),
    ShortsTrackerForbidden: (),
    ShortsTrackerHandlerZero: (),

    ShortsTrackerAlreadyMigrated: (),
    ShortsTrackerInvalidLen: (),
    ShortsTrackerVaultZero: (),
}
```
