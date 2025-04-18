# Example: sway-lsp/tests/fixtures/completion/src/main.sw

```sway
script;

struct MyStruct {
    a: bool,
}

impl MyStruct {
    fn new() -> Self {
        Self { a: true }
    }

    fn get(self, foo: Self) -> Self {
        foo
    }
}

fn main() {
    let foo = MyStruct::new();
    let bar = MyStruct::new();
    foo.
}

```
