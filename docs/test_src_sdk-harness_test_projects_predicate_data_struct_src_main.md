# Example: test/src/sdk-harness/test_projects/predicate_data_struct/src/main.sw

```sway
predicate;

use std::inputs::input_predicate_data;

struct Validation {
    has_account: bool,
    total_complete: u64,
}

fn main() -> bool {
    let validation: Validation = match input_predicate_data::<Validation>(0) {
        Some(data) => data,
        None => return false,
    };
    validation.total_complete == 100 && validation.has_account
}

```
