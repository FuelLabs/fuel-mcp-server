# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/method_on_empty_struct/src/main.sw

```sway
script;

struct A { }

impl A {
    fn f(self) -> u64 {
        1
    }
}

fn main() -> u64 {
    let a = A { };
    a.f()
}

```
