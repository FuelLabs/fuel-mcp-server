# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/import_with_different_callpaths/src/main.sw

```sway
script;

pub mod data_structures;
mod eq_impls;

use eq_impls::*;
use data_structures::*;

fn main() {
    let mut expected = Vec::new();
    expected.push(SomeEnum::A(0u32));
    expected.push(SomeEnum::A(1u32));

    assert(expected == expected);

    let mut expected = Vec::new();
    expected.push(SomeStruct { a: 0u32 });
    expected.push(SomeStruct { a: 1u32 });

    assert(expected == expected);
}

```
