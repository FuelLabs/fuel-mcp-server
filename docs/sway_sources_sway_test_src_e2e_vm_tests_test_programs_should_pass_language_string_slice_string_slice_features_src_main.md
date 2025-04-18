# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/string_slice/string_slice_features/src/main.sw

```sway
script;

fn len_3(_s: str[3]) -> u64 {
    3
}

fn main() -> u64 {
    let a: str = "abc";
    let b: str[3] = __to_str_array("def");
    a.len() + len_3(b)
}

```
