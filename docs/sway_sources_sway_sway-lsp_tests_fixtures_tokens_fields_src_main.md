# Example: sway_sources/sway/sway-lsp/tests/fixtures/tokens/fields/src/main.sw

```sway
contract;

mod foo;

struct A {
    a: Option<Option<u32>>,
}

enum B {
    B: Option<Option<u32>>,
}

storage {
    test: Option<Option<u32>> = Option::Some(Option::Some(0)),
}

struct Bar {
    bar: foo::Foo,
}

```
