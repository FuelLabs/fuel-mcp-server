# Example: test/src/sdk-harness/test_artifacts/auth_predicate/src/main.sw

```sway
predicate;

use std::auth::predicate_address;

fn main(address: Address) -> bool {
    let result = match predicate_address() {
        Some(address) => address,
        None => return false,
    };
    address == result
}

```
