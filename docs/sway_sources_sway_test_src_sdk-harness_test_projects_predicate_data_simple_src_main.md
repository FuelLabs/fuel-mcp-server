# Example: sway_sources/sway/test/src/sdk-harness/test_projects/predicate_data_simple/src/main.sw

```sway
predicate;

use std::inputs::input_predicate_data;

fn main() -> bool {
    let received: u32 = match input_predicate_data::<u32>(0) {
        Some(data) => data,
        None => return false,
    };
    let expected: u32 = 12345;

    received == expected
}

```
