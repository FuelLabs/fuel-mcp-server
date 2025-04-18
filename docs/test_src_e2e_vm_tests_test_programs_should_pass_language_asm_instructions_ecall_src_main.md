# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/asm/instructions/ecall/src/main.sw

```sway
library;

pub fn main() {
    asm(r1: 1u64, r2: 2u32, r3: 3u32, r4: 4u32) {
        ecal r1 r2 r3 r4;
    }
}

```
