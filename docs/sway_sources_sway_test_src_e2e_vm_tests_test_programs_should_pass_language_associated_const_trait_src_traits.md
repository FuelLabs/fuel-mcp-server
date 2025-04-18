# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/associated_const_trait/src/traits.sw

```sway
library;

pub trait ConstantId {
    const ID: u32;
}

pub trait OtherConstantId {
    const ID: u32;
}

pub trait GenericConstantId<T> {
    const ID: T;
}

pub trait Default {
    fn default() -> Self;
}

impl Default for u64 {
    fn default() -> Self { 0 }
}

impl Default for bool {
    fn default() -> Self { false }
}

pub trait GenericConstantIdWithDefault<T> where T: Default {
    const ID: T = T::default();
}

```
