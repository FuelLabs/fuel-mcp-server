# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/blanket_trait/src/main.sw

```sway
script;

trait MyFrom<T> {
    fn from(t: T) -> Self;
}

impl<T> MyFrom<T> for T {
    fn from(t: T) -> T {
        t
    }
}

struct A {}

struct B {}

impl MyFrom<A> for B {
    fn from(_t: A) -> B {
        B {}
    }
}

pub fn main() -> bool {
    let a = A {};
    let _b: B = B::from(a);

    true
}
```
