# Example: test/src/e2e_vm_tests/test_programs/should_pass/stdlib/ge_test/src/main.sw

```sway
script;

fn main() -> bool {

  !(5 >= 10) && 5 >= 5 && 10 >= 10 && !(4 >= 5) && 10 >= 5
  
}

```
