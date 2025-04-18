# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/mutable_arrays_enum/src/main.sw

```sway
script;

struct X {
    value: u64
}

enum Foo {
    Bar: X,
}

fn main() -> u64 {
    let mut my_array: [Foo; 1] = [Foo::Bar(X{value: 10})];
    my_array[0] = Foo::Bar(X{value: 20});
    match my_array[0] {
        Foo::Bar(x) => x.value,
    }
}

```
