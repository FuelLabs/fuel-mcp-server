# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/struct_field_access/src/main.sw

```sway
script;

// Tests struct field reassignments and accessing fields from a returned struct.

fn main() -> u64 {
    let mut data = Data {
        uselessnumber: 42,
    };
    data.uselessnumber = 43;

    let _other = ret_struct().uselessnumber;

    return data.uselessnumber;
}

struct Data {
    uselessnumber: u64,
}

fn ret_struct() -> Data {
    Data {
        uselessnumber: 44,
    }
}

```
