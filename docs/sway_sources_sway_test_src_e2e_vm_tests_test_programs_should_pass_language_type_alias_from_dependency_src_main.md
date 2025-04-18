# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/type_alias_from_dependency/src/main.sw

```sway
library;

use type_alias_basic::*;

fn foo() {
    let z = type_alias_basic::Alias { };
}

```
