# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/multiple_fns_same_name/src/main.sw

```sway
script;

mod colors1;
mod colors2;

fn main() {
	let _ = colors1::color();
	let _ = colors2::color();
}

```
