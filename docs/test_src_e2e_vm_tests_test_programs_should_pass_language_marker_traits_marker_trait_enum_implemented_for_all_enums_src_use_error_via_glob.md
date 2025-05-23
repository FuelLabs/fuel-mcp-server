# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/marker_traits/marker_trait_enum_implemented_for_all_enums/src/use_error_via_glob.sw

```sway
library;

use std::marker::*;

use ::enums_01::{LibEnum01, EmptyLibEnum01};

// TODO: Remove one trait coherence and collecting of trait
//       impls is implemented. See comment in `main.sw`.
use ::enums_02::*;

enum LocalEnum {
    A: (),
}

enum LocalEmptyEnum { }

fn implements_enum<T>(_t: T) where T: Enum { }
fn implements_enum_no_args<T>() where T: Enum { }

pub fn test() {
    implements_enum(LocalEnum::A);
    implements_enum_no_args::<LocalEnum>();
    implements_enum_no_args::<LocalEmptyEnum>();

    implements_enum(LibEnum01::A);
    implements_enum_no_args::<LibEnum01>();
    implements_enum_no_args::<EmptyLibEnum01>();

    implements_enum(::enums_02::LibEnum02::A);
    implements_enum_no_args::<::enums_02::LibEnum02>();
    implements_enum_no_args::<::enums_02::EmptyLibEnum02>();
}

```
