# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/ref_mutable_fn_args_call/src/main.sw

```sway
script;

// x += 1 below passes x which is a pointer in the IR
// directly to std::ops::add, so this tests that we can pass
// the pointer parameter to a call that doesn't expect a pointer,
// requiring us to issue an IR load first.

fn foo(ref mut x: u64) {
    x += 1;
}

fn main() -> u64 {
    let mut x = 1;
    foo(x);
    x
}

```
