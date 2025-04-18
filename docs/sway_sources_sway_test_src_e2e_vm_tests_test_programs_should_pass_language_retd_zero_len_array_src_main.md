# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/retd_zero_len_array/src/main.sw

```sway
script;

fn main() -> [u32; 0] {
    let x: [u32; 0] = [];
    x
}

```
