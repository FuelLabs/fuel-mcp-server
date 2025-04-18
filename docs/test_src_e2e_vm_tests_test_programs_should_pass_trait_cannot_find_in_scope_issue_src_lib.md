# Example: test/src/e2e_vm_tests/test_programs/should_pass/trait_cannot_find_in_scope_issue/src/lib.sw

```sway
library;

use std::hash::Hash;

pub trait FirstTrait {}

pub trait SecondTrait<T> {
    fn trait_method(self, t: T) where T: FirstTrait;
    fn trait_associated_function(t: T) where T: FirstTrait;
}

pub trait GenericTrait<T> {}

pub trait DuplicatedTrait {}

pub struct A {}

pub struct S {}

impl S {
    pub fn method_01<T>(self, t: T) where T: Hash { }
    pub fn method_02<T>(self, t: T) where T: FirstTrait { }

    pub fn associated_function<T>(t: T) where T: FirstTrait { }
}

pub fn function<T>(t: T) where T: FirstTrait + GenericTrait<u8> { }
```
