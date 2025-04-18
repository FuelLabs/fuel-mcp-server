# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/supertraits_via_self/src/main.sw

```sway
contract;

struct S {}

trait MySuperTrait {
    fn foo();
}

trait MyTrait : MySuperTrait {
    fn bar();
} {
    // supertrait's methods are accessible in the default-implemented methods block
    fn baz() {
        Self::foo()
    }
}

impl MySuperTrait for S {
    fn foo() { }
}

impl MyTrait for S {
    // supertrait's methods are accessible in contract methods' bodies
    fn bar() { Self::foo() }
}

```
