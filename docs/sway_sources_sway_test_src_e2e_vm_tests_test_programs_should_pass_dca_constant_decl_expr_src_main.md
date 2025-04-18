# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/constant_decl_expr/src/main.sw

```sway
script;

const C1 = 66;

fn main() -> u64 {
    const C2 = C1;
    C2
}

```
