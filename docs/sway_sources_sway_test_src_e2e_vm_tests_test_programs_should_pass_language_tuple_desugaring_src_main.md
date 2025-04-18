# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/tuple_desugaring/src/main.sw

```sway
script;

fn gimme_a_pair() -> (u32, u64) {
    (1u32, 2u64)
}

fn main() -> u32 {
    let x = gimme_a_pair();
    let y = match x {
        (a, 3u64) => { (a, 7u32) },
        (_a, _b) => { (0u32, 9u32) },
    };
    match y {
        (_a, b) => { b },
    }
}

```
