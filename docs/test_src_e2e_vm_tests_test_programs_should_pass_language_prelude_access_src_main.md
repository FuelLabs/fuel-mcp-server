# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/prelude_access/src/main.sw

```sway
script;

struct A {
    addr: Address,
}

// Ensure shadowing is allowed.
use std::address::Address;

fn main() {
}

```
