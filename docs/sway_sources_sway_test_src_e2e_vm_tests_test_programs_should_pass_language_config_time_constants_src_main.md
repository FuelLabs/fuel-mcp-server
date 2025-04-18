# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/config_time_constants/src/main.sw

```sway
script;

fn main() -> u64 {
    let _addr = some_contract_addr;

    return if true_bool { some_num } else { 0 } ;
}

```
