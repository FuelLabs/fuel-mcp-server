# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/ref_mutable_fn_args_struct/src/main.sw

```sway
script;

struct Foo {
    value: u64
}

impl Foo {
    pub fn set(ref mut self, value: u64) -> u64 {
        self.value = value;
        self.value
    }
}

fn mut_foo(ref mut foo: Foo) {
    foo.set(10);
}

fn main() -> u64 {
    let mut foo = Foo { value: 0 };
    mut_foo(foo);
    foo.value
}

```
