# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/import_star_name_clash/src/b.sw

```sway
library;

pub struct MyStruct {
    pub b: u64,
}

pub enum MyEnum {
    A: u64,
}

pub enum MyOtherEnum {
    C: u64,
}

pub fn project_my_enum_b(e : MyEnum) -> u64 {
    match e {
	MyEnum::A(val) => val,
    }
}

```
