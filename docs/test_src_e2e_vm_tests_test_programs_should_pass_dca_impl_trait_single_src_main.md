# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/impl_trait_single/src/main.sw

```sway
script;

trait Get1 {
    fn get(self) -> u64;
}

struct Data1 {
    value: u64
}

impl Get1 for Data1 {
    fn get(self) -> u64 {
        self.value
    }
}

fn main() -> u64 {
    let a = Data1 {
        value: 7
    };
    let _c = a.get();
    0
}

```
