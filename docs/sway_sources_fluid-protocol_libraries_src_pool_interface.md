# Example: sway_sources/fluid-protocol/libraries/src/pool_interface.sw

```sway
library;

abi Pool {
    #[storage(read)]
    fn get_asset() -> u64;

    #[storage(read)]
    fn get_usdf_debt() -> u64;

    #[storage(read, write)]
    fn increase_usdf_debt(amount: u64);

    #[storage(read, write)]
    fn decrease_usdf_debt(amount: u64);
}

```
