# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/enum_variant_imports/src/main.sw

```sway
script;

mod submodule;

fn main() -> u64 {
    single();
    //glob();
    //shadowing_glob();
    0
}

fn single() {
    use submodule::Enum;
    use submodule::Enum::Yes;

    let val = Yes(10);

    match val {
        Enum::No(_) => assert(false),
        Yes(a) => assert(a == 10),
    }
}

fn glob() {
    use submodule::Enum;
    use submodule::Enum::*;

    let val = Yes(10);

    match val {
        No(_) => assert(false),
        Yes(a) => assert(a == 10),
    }
}

fn shadowing_glob() {
    use submodule::Enum;
    use submodule::Enum::Yes;
    use submodule::Enum::*;

    let val = Yes(10);

    match val {
        No(_) => assert(false),
        Yes(a) => assert(a == 10),
    }
}

```
