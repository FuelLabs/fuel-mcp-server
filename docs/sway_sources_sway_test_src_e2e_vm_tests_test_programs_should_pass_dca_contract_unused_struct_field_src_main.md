# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/contract/unused_struct_field/src/main.sw

```sway
contract;

struct S {
    x: u64,
}

abi MyContract {
    fn foo(s: S) -> S;
}

impl MyContract for Contract {
    fn foo(s: S) -> S {
        s
    }
}

```
