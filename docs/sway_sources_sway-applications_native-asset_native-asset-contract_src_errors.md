# Example: sway_sources/sway-applications/native-asset/native-asset-contract/src/errors.sw

```sway
library;

pub enum AmountError {
    AmountMismatch: (),
}

pub enum MintError {
    MaxMinted: (),
}

pub enum SetError {
    ValueAlreadySet: (),
}

```
