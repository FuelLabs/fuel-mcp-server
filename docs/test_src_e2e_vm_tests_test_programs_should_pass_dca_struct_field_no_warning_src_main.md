# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/struct_field_no_warning/src/main.sw

```sway
script;

struct CallData {
  id: u64,
}

pub struct Proposal {
  call_data: CallData,
}

fn main(p: Proposal) -> u64 {
  p.call_data.id
}

```
