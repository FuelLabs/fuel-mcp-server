# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/impl_self_method_multiple/src/main.sw

```sway
script;

struct Struct {
}

impl Struct {
    pub fn bar(self) -> u32 { self.foo() }
}

impl Struct {
    pub fn foo(self) -> u32 { 10 }
}

fn main() -> u32 {
    let s = Struct {};
    s.bar()
}

```
