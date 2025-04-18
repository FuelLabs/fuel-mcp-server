# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/zero_field_types/src/main.sw

```sway
script;

struct StructWithNoFields {}
enum EnumWithNoVariants {}

fn main() -> u64 {
    let _unit_struct = StructWithNoFields {};
    10u64
}

```
