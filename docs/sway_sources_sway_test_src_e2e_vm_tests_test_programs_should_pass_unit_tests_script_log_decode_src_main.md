# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/script_log_decode/src/main.sw

```sway
script;

fn main() {

}


#[test]
fn test_fn() {
	let a = 10;
	log(a);
	let b = 30;
	log(b);
	assert_eq(a, 10)
}

```
