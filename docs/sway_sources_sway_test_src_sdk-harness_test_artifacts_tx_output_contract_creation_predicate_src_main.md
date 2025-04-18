# Example: sway_sources/sway/test/src/sdk-harness/test_artifacts/tx_output_contract_creation_predicate/src/main.sw

```sway
predicate;

use std::outputs::{Output, output_type};

fn main() -> bool {
    output_type(2).unwrap() == Output::ContractCreated
}

```
