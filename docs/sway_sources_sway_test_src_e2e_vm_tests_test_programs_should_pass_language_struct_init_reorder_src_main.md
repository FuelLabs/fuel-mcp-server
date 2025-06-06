# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/struct_init_reorder/src/main.sw

```sway
script;

pub struct MyInnerStruct {
    x: u64,
    y: u64,
}

pub struct MyStruct {
    value: MyInnerStruct,
}

pub enum MyEnum {
    V1: u8,
    V2: u64,
}

pub struct Foo {
    f1: MyEnum,
    f2: MyStruct,
}

fn main() {
    let f1 : MyEnum = MyEnum::V1(0u8);
    let f2 : MyStruct = MyStruct { value: MyInnerStruct { x: 0, y: 0 } };
    // f1 and f2 are instantiated in the wrong order below. that shouldn't matter.
    poke(Foo {
        f2,
        f1
    });
}

#[inline(never)]
fn poke(_f: Foo) {}

```
