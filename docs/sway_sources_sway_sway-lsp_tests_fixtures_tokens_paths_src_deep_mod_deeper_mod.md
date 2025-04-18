# Example: sway_sources/sway/sway-lsp/tests/fixtures/tokens/paths/src/deep_mod/deeper_mod.sw

```sway
library;

pub fn deep_fun(){}

pub enum DeepEnum {
    Variant: (),
    Number: u32,
}

pub struct DeepStruct<T> {
    pub field: T,
}

```
