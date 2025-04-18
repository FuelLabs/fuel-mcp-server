# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/contract/abi_fn_params/src/main.sw

```sway
contract;

struct S {
}

enum E {
}

abi MyContract {
    fn get_struct(s: S) -> S;
    fn get_enum(e: E) -> E;
}

impl MyContract for Contract {
    fn get_struct(s: S) -> S {
        s
    }

    fn get_enum(e: E) -> E {
        e
    }
}

```
