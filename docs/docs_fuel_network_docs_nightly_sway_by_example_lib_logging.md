[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Logging

## _Icon Link_ [Logging](https://docs.fuel.network/docs/nightly/sway-by-example-lib/logging/\#logging)

Examples of logging in Sway

```fuel_Box fuel_Box-idXKMmm-css

contract;

use std::logging::log;

abi MyContract {
    fn test_func(val: u64);
}

impl MyContract for Contract {
    fn test_func(val: u64) {
        log(val);
    }
}

```

_Icon ClipboardText_