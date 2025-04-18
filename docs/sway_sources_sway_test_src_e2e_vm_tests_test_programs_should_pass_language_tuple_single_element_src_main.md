# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/tuple_single_element/src/main.sw

```sway
script;

struct S {
    t: (u64,)
}

fn main() -> u64 {
    let a = S {
        t: (2,)
    };
    let b = match a {
        S { t } => t,
    };
    assert(b.0 == 2);

    1
}

```
