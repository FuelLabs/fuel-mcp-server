# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/module_dep/src/a.sw

```sway
library;

use ::b::*;

pub fn a() { b(); }

```
