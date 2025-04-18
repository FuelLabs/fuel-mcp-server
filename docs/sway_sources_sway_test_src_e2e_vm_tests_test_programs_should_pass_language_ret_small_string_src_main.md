# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/ret_small_string/src/main.sw

```sway
script;

fn main() -> str[3] {
    __to_str_array("foo")
}

```
