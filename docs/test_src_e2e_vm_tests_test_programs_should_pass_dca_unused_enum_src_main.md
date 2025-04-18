# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_enum/src/main.sw

```sway
script;

pub mod r#enum;
mod utils;

fn main() {
    let _ = utils::uses_enum();
}

```
