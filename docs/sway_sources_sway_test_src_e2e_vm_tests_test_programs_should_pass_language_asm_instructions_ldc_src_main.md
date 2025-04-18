# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/asm/instructions/ldc/src/main.sw

```sway
predicate;

fn main() -> bool {
    asm(r1: 0, r2: 0, r3: 0) {
        ldc r1 r2 r3 i0;
    }
    true
}
```
