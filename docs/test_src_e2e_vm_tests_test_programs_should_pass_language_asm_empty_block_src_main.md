# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/asm_empty_block/src/main.sw

```sway
library;

pub fn test() {
    let _ = asm() {
    };

    let _ = asm() { };

    let _ = asm(r1: 0) { };

    let _ = asm() { zero };

    let _ = asm() { zero: u32 };

    let _ = asm(r1: 0, res) {
        addi res r1 i0;
    };
}

```
