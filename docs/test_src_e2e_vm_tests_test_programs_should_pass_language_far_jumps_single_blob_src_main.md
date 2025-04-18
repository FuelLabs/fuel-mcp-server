# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/far_jumps/single_blob/src/main.sw

```sway
script;

fn main() -> u64 {
    if t() {
        111
    } else {
        asm() {
            blob i262144;
        }
        222
    }
}

fn t() -> bool {
    asm() {
        one: bool
    }
}

```
