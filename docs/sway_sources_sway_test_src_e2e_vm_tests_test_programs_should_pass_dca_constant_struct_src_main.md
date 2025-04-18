# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/constant_struct/src/main.sw

```sway
script;

struct A {
   a : u64
}

fn foo(a : u64) -> A {
  A { a }
}

const B : A = foo(32);

fn main() -> u64 {
    B.a
}

```
