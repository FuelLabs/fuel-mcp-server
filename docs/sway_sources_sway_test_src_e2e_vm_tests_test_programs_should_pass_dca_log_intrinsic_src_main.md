# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/log_intrinsic/src/main.sw

```sway
script;

struct Foo {
    value: u64
}

fn main() -> u64 {
    __log(Foo {value: 0});
    0
}

```
