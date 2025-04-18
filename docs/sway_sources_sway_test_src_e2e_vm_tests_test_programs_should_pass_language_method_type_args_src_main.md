# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/method_type_args/src/main.sw

```sway
script;

struct A {}

impl A {
    fn generic<T>(self, x: T) -> T { x }
}

fn foo() -> bool {
    A {}.generic::<bool>(true)
}

fn main() {
    let _ = foo();
}

```
