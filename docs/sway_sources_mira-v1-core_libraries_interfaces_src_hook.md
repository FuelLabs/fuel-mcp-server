# Example: sway_sources/mira-v1-core/libraries/interfaces/src/hook.sw

```sway
library;

use std::bytes::Bytes;
use ::data_structures::PoolId;

/// Hook for potential periphery features such as oracles etc.
abi IBaseHook {
    #[storage(read, write)]
    fn hook(
        pool_id: PoolId,
        sender: Identity,
        to: Identity,
        asset_0_in: u64,
        asset_1_in: u64,
        asset_0_out: u64,
        asset_1_out: u64,
        lp_token: u64,
    );
}

```
