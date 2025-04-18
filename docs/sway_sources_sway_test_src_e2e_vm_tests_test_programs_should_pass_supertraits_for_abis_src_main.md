# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/supertraits_for_abis/src/main.sw

```sway
contract;

trait MyTrait {
    fn foo();
}

abi MyAbi : MyTrait {
    fn bar();
} {
    fn baz() { Self::foo() }
}

impl MyTrait for Contract {
    fn foo() { }
}

// The implementation of MyAbi for Contract should also implement MyTrait.
impl MyAbi for Contract {
    fn bar() { Self::foo() }
}

```
