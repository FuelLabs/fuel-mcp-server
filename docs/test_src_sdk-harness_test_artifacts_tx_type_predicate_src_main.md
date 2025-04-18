# Example: test/src/sdk-harness/test_artifacts/tx_type_predicate/src/main.sw

```sway
predicate;

use std::tx::{Transaction, tx_type};

fn main(expected_type: Transaction) -> bool {
    tx_type() == expected_type
}

```
