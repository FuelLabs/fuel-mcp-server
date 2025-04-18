# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/enum_destructuring/src/main.sw

```sway
script;

enum Result<T, E> {
  Ok: T,
  Err: E,
}

fn main() -> u64 {
   let x: Result<u64, u64> = Result::Ok::<u64, u64>(5u64);

    // should return 15
    if let Result::Ok(y) = x { y + 10 } else { 1 }
}

```
