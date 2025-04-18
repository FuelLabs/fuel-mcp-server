# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/smo_opcode/src/main.sw

```sway
script;

// Use local constant to avoid importing `std`.
const ZERO_B256 = 0x0000000000000000000000000000000000000000000000000000000000000000;

fn main() -> bool {
    asm(recipient: ZERO_B256, msg_len: 0, output: 0, coins: 0) {
        smo recipient msg_len coins output;
    }
    true
}

```
