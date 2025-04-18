# Example: test/src/sdk-harness/test_artifacts/tx_output_count_predicate/src/main.sw

```sway
predicate;

use std::outputs::output_count;

fn main(expected_count: u16) -> bool {
    output_count() == expected_count
}

```
