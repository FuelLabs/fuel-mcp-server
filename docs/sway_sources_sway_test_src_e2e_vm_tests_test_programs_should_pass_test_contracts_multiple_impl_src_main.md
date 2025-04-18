# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/multiple_impl/src/main.sw

```sway
contract;

mod testlib;
mod testlib2;
use testlib2::bar;

abi TestContr {
    fn foo();
}

fn foo() {
    testlib::foo();
}

fn bar() {}

impl TestContr for Contract {
    fn foo() {
        foo();
        bar();
    }
}

```
