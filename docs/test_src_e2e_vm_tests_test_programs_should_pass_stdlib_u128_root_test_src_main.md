# Example: test/src/e2e_vm_tests/test_programs/should_pass/stdlib/u128_root_test/src/main.sw

```sway
script;

use std::u128::*;

fn main() -> bool {

    let mut u_128: U128 = U128::from((0, 49));
    let mut root_of_u_128 = u_128.sqrt();
    
    assert(root_of_u_128 == U128::from((0, 7)));
    
    u_128 = U128::from((0, 25));
    root_of_u_128 = u_128.sqrt();
    assert(root_of_u_128 == U128::from((0, 5)));
    
    u_128 = U128::from((0, 81));
    root_of_u_128 = u_128.sqrt();
    assert(root_of_u_128 == U128::from((0, 9)));
    
    u_128 = U128::from((0, 144));
    root_of_u_128 = u_128.sqrt();
    assert(root_of_u_128 == U128::from((0, 12)));
    
    u_128 = U128::from((0, 1));
    root_of_u_128 = u_128.sqrt();
    assert(root_of_u_128 == U128::from((0, 1)));

    true
}

```
