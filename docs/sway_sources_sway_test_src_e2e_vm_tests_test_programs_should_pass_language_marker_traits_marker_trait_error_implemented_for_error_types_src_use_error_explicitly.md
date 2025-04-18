# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/marker_traits/marker_trait_error_implemented_for_error_types/src/use_error_explicitly.sw

```sway
library;

use std::marker::Error;

#[error_type]
enum Enum {
    #[error(m = "error message")]
    A: (),
}

fn implements_error<T>(_t: T) where T: Error { }
fn implements_error_no_args<T>() where T: Error { }

pub fn test() {
    implements_error("str");
    implements_error_no_args::<str>();
    implements_error(());
    implements_error_no_args::<()>();
    implements_error(Enum::A);
    implements_error_no_args::<Enum>();
}

```
