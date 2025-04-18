# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/typeinfo_custom_callpath/src/main.sw

```sway
script;

mod foo;

struct Bar {
  baz: foo::Foo
}


fn main() {
    let x = Bar {
        baz: foo::Foo::A
    };

    let b = match x {
        Bar { baz: foo::Foo::A(_) } => true,
        _ => false,
    };

    assert(b);
}

```
