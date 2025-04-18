# Example: sway_sources/sway/sway-lsp/tests/fixtures/auto_import/src/deep_mod/deeper_mod.sw

```sway
library;

pub fn deep_fun(){}

pub enum DeepEnum {
    Variant: (),
    Number: u32,
}

pub struct DeepStruct<T> {
    field: T,
}

pub type A = DeepStruct<u32>;

pub trait DeepTrait {
    fn deep_method(self);
}
```
