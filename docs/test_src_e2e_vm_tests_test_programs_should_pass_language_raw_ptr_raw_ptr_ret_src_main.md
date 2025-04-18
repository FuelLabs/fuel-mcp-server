# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/raw_ptr/raw_ptr_ret/src/main.sw

```sway
script;

struct S {
    x: u64,
}

fn main() -> raw_ptr {
    __addr_of(S { x: 123 })
}

```
