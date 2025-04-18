# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/use_full_path_names/src/main.sw

```sway
script;

mod foo;
mod bar;
mod baz;

fn main() -> u32 {
    let _x = foo::Foo {
        foo: 1u32,
    };
    let _y = bar::Bar::Baz(true);
    let _z = ::bar::Bar::Baz(false);
    baz::return_1()
}

```
