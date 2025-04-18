# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/ret_string_in_struct/src/main.sw

```sway
script;

struct Wrapper {
    name: str[9],
}

fn main() -> Wrapper {
    Wrapper {
        name: __to_str_array("fuel-labs"),
    }
}

```
