# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/lib_multi_test/src/lib.sw

```sway
library;

fn pow2(x: u64) -> u64 {
    log(x);
    x * x
}

#[test]
fn test_add() {
    assert(2 + 2 == 4);
}

#[test]
fn test_sub() {
    assert(32 - 8 == 24);
}

#[test]
fn test_gt() {
    log(100);
    assert(101 > 100);
}

#[test]
fn test_lt() {
    assert(3 < 4);
}

#[test]
fn test_local() {
    assert(pow2(4) == 16)
}

```
