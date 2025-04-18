# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/callpath_local_shadowing/src/main.sw

```sway
script;

mod lib;

use lib::*;

struct TestStruct {
    pub x: u64,
    pub y: u64,
}

fn main() {
   let ts = TestStruct { x: 0, y: 0 };
   poke(ts.x);
}

fn poke<T>(_x: T) { }

```
