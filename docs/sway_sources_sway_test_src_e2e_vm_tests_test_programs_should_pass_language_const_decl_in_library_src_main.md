# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/const_decl_in_library/src/main.sw

```sway
script;

mod heaven;
mod earth;
mod hell;
mod moon;

use heaven::UNKNOWN_DEITY_VALUE;
use earth::MAN;
use hell::THE_DEVIL;

fn god() -> u64 {
    if MAN == 5 && THE_DEVIL == 6 {
        7
    } else {
        UNKNOWN_DEITY_VALUE
    }
}

use heaven::MONKEYS_GONE_HERE;

fn main() -> bool {
    if moon::WE_WERE_NEVER_HERE {
        if god() == 7 {
            MONKEYS_GONE_HERE
        } else {
            false
        }
    } else {
        false
    }
}

```
