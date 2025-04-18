# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/method_indirect_inference/src/main.sw

```sway
script;

fn main() -> u64 {
    use std::bytes::Bytes;
    use std::convert::TryFrom;
    
    let mut bytes = Bytes::new();
    bytes.push(1_u64.try_into().unwrap());

    1
}

```
