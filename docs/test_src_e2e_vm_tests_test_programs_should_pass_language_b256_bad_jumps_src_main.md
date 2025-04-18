# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/b256_bad_jumps/src/main.sw

```sway
script;

fn main() -> u64 {
    let _addr = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
    if 0 == 1 {
        0
    } else {
        1
    }
}

```
