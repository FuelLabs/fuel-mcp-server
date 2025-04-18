# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/module_dep_multiple/src/a.sw

```sway
library;

use ::b::*;

pub fn a() { b(); }

```
