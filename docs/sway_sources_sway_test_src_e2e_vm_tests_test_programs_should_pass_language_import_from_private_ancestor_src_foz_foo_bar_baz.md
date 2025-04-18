# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/import_from_private_ancestor/src/foz/foo/bar/baz.sw

```sway
library;

// This is legal even though foo is a private module, because foo is an ancestor of the current module
use ::foz::foo::*;

```
