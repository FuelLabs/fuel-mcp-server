# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/import_method_from_other_file/src/context.sw

```sway
library;
pub struct Context {
  pub something: u64
}

impl Context {
  pub fn foo() -> Self {
    Context { something: 10 }
  }
}

```
