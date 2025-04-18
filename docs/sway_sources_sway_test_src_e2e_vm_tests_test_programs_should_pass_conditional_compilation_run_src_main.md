# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/conditional_compilation/run/src/main.sw

```sway
script;

#[cfg(target = "fuel")]
const VALUE: u64 = 40;
#[cfg(target = "evm")]
const VALUE: () = ();

#[cfg(target = "fuel")]
fn main() -> u64 {
  VALUE
}
#[cfg(target = "evm")]
fn main() {
  VALUE
}

```
