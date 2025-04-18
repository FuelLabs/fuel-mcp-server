# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/multiple_supertraits_for_abis/src/main.sw

```sway
contract;

trait MyTrait1 {
    fn foo1();
}

trait MyTrait2 {
    fn foo2();
}

abi MyAbi : MyTrait1 + MyTrait2 {
    fn bar();
} {
    fn baz() {
        Self::foo1();
        Self::foo2();
    }
}

impl MyTrait1 for Contract {
    fn foo1() { }
}

impl MyTrait2 for Contract {
    fn foo2() { }
}

// The implementation of MyAbi for Contract should also implement MyTrait1 and MyTrait2
impl MyAbi for Contract {
    fn bar() {
        Self::foo1();
        Self::foo2();
    }
}

```
