# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/impl_self_method_order/src/main.sw

```sway
script;

struct Struct {
}

impl Struct {
    pub fn foo(self) -> u32 { 10 }
    pub fn bar(self) -> u32 { self.foo() }
}

fn main() -> u32 {
    let s = Struct {};
    s.bar()
}

```
