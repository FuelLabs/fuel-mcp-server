# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/break_and_continue_block_ret/src/main.sw

```sway
script;

fn main() {
    while true {
        if true {
            break;
        }
    }

    while true {
        if true {
            continue;
        }
    }
}

```
