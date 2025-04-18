# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/generic_struct/src/main.sw

```sway
script;

struct Foo<T> {
  a: T,
}

fn get_a<V>(foo: Foo<V>) -> V {
  foo.a
}

fn main() -> bool {
  let foo = Foo { a: true };
  let _bar = Foo { a: 10 };

  get_a(foo)
}

```
