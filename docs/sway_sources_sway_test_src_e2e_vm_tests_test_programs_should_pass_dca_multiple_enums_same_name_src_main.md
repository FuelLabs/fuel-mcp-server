# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/multiple_enums_same_name/src/main.sw

```sway
script;

mod colors1;
mod colors2;

fn main() {
	let _c1 = colors1::Colors::Red;
	let _c2 = colors2::Colors::Red;
}

```
