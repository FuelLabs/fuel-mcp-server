# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/struct_field_reassignment/src/main.sw

```sway
script;
// this file tests struct field reassignments
fn main() -> u64 {
    let mut data = Data {
        value: NumberOrString::Number(20),
        address: 0b00001111,
    };

    data.value = NumberOrString::String("sway");
    return 0;
}

enum NumberOrString {
    Number: u64,
    String: str,
}

struct Data {
    value: NumberOrString,
    address: u8,
}

```
