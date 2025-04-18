# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/ref_mutable_fn_args_u32/src/main.sw

```sway
script;

fn mut_arg(ref mut b: u32) {
    b = 20;
}

fn main() -> u32 {
    let mut b = 0u32;
    mut_arg(b);
    b
}

```
