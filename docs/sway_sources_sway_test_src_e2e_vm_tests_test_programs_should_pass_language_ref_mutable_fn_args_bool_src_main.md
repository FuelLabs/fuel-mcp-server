# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/ref_mutable_fn_args_bool/src/main.sw

```sway
script;

fn mut_arg(ref mut b: bool) {
    b = true;
}

fn main() -> bool {
    let mut b = false;
    mut_arg(b);
    b
}

```
