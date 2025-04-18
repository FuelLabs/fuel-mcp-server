# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/prelude_access2/src/main.sw

```sway
script;

struct A {
    f1: Address,
    f2: ContractId,
    f3: Identity,
    f4: Vec<u8>,
}

fn foo() {
    assert(true);
    require(true, 0);
    revert(0);
}

fn main() {
}

```
