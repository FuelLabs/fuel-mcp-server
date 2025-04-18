# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/mutable_arrays_struct/src/main.sw

```sway
script;

struct Foo {
    value: u64
}

fn main() -> u64 {
    let mut my_array: [Foo; 1] = [Foo{value: 10}];
    my_array[0] = Foo{value: 20};
    my_array[0].value
}

```
