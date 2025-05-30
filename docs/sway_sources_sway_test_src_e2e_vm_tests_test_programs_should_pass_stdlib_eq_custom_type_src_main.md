# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/stdlib/eq_custom_type/src/main.sw

```sway
script;

use std::ops::*;

enum Error {
    BoolError: bool,
    U8Error: u8,
}

impl PartialEq for Error {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (Error::BoolError(val1), Error::BoolError(val2)) => val2 == val1,
            (Error::U8Error(val1), Error::U8Error(val2)) => val2 == val1,
            _ => false,
        }
    }
}
impl Eq for Error {}

fn test_none_ok_or_eq<T, E>(_val: T, default: E)
where
    E: Eq,
{
    match None::<T>.ok_or(default) {
        Ok(_) => revert(0),
        Err(e) => assert(default == e),
    }
}

fn test_none_ok_or_partial_eq<T, E>(_val: T, default: E)
where
    E: Eq,
{
    match None::<T>.ok_or(default) {
        Ok(_) => revert(0),
        Err(e) => assert(default == e),
    }
}

fn test() {
    test_none_ok_or_eq(true, Error::BoolError(true));
    test_none_ok_or_partial_eq(true, Error::BoolError(true));
}

fn main() -> bool {
    test();
    return true;
}

```
