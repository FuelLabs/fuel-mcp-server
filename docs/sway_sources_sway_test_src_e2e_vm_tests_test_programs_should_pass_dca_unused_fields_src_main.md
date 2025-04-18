# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_fields/src/main.sw

```sway
script;

mod utils;
use utils::Foo;

struct Bar {
    value: u64
}

fn internal_fn(_s: Bar) {

}

fn main() -> u64 {
    internal_fn(Bar {value: 0});
    utils::external_fn(Foo {value: 0});
    0
}

```
