# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/import_method_from_other_file/src/main.sw

```sway
script;

mod context;
pub mod asset;
mod utils;

use context::Context;
use utils::Wrapper;

fn eq_test() {
   let w1 = Wrapper::new(3);
   let w2 = Wrapper::new(3);

   assert(w1 == w2);
   assert(w1.asset == w2.asset);
}

fn main() -> u64 {
   eq_test();

   let x = Context::foo();
   x.something
}

```
