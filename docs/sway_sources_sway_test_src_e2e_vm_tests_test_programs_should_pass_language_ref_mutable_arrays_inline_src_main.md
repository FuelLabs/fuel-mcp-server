# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/ref_mutable_arrays_inline/src/main.sw

```sway
script;

fn main() -> u64 {
    let mut arr: [u64; 1] = [1];
    takes_ref_mut_array(arr);
    arr[0]
}

#[inline(always)]
fn takes_ref_mut_array(ref mut arr: [u64; 1]) {
    arr[0] = 10;
}

```
