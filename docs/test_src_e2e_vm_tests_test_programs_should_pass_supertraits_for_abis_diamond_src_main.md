# Example: test/src/e2e_vm_tests/test_programs/should_pass/supertraits_for_abis_diamond/src/main.sw

```sway
contract;

///         Top
///      /       \
///    Left     Right
///      \       /
///        MyAbi

trait Top {
    fn top();
}

trait Left : Top {
    fn left();
}

trait Right : Top {
    fn right();
}

abi MyAbi : Left + Right {
    fn abi_method();
}

impl Top for Contract {
    fn top() { }
}

impl Left for Contract {
    fn left() { Self::top() }
}

impl Right for Contract {
    fn right() { Self::top() }
}

impl MyAbi for Contract {
    fn abi_method() {
        Self::top();
        Self::left();
        Self::right();
    }
}

```
