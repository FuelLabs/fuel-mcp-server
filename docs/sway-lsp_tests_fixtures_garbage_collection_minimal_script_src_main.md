# Example: sway-lsp/tests/fixtures/garbage_collection/minimal_script/src/main.sw

```sway
script;

struct MyStruct {
    field1: u16,
}

fn func(s: MyStruct) -> u16 {
    s.field1
}

fn main() {
    let x = MyStruct { field1: 10 };
    let y = func(x);
}
```
