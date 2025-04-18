# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/attributes_unknown/src/main.sw

```sway
library;

#[alow]
#[alow()]
#[alow(arg)]
#[alow(arg = 0)]
#[depricated(note = "note")]
#[unknown_0, unknown_1(arg), unknown_2(arg_1 = "value", arg_2)]
struct S { }
```
