# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/ref_mutable_fn_args_struct_assign/src/main.sw

```sway
script;

struct Foo {
    value: u64
}

fn mut_foo(ref mut foo: Foo) {
    foo = Foo { value: 10 };
}

fn main() -> u64 {
    let mut foo = Foo { value: 0 };
    mut_foo(foo);
    foo.value
}

```
