# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/module_dep_multiple/src/c.sw

```sway
library;

use ::a::*;

pub fn c() { a(); }

```
