# Example: sway_sources/sway/test/src/sdk-harness/test_projects/low_level_call/src/main.sw

```sway
script;

use std::low_level_call::{call_with_function_selector, CallParams};
use std::bytes::Bytes;

fn main(
    target: ContractId,
    function_selector: Bytes,
    calldata: Bytes,
    single_value_type_arg: bool,
) {
    let call_params = CallParams {
        coins: 0,
        asset_id: AssetId::base(),
        gas: 10_000_000,
    };
    
    call_with_function_selector(
        target,
        function_selector,
        calldata,
        // single_value_type_arg,
        call_params,
    );
}

```
