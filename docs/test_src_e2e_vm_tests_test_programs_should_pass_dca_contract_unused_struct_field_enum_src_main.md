# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/contract/unused_struct_field_enum/src/main.sw

```sway
contract;

struct S {
    x: u64,
}

enum E {
    A: S,
}

abi MyContract {
    fn foo(s: S) -> E;
}

impl MyContract for Contract {
    fn foo(s: S) -> E {
        E::A(s)
    }
}

```
