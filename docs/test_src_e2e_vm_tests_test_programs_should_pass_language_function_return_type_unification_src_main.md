# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/function_return_type_unification/src/main.sw

```sway
script;

trait Build {
    fn build() -> Self;
}

impl Build for u32 {
    fn build() -> Self {
        31
    }
}

impl Build for u64 {
    fn build() -> Self {
        63
    }
}

fn produce<T>() -> T
where T: Build,
{
    T::build()
}

fn main() -> u32 {
    let x: u32 = produce();
    x
}
```
