# Example: test/src/sdk-harness/test_artifacts/tx_input_count_predicate/src/main.sw

```sway
predicate;

use std::inputs::input_count;

fn main(expected_count: u16) -> bool {
    input_count() == expected_count
}

```
