# Example: sway_sources/sway-applications/native-asset/native-asset-contract/src/interface.sw

```sway
library;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Identity);
}

```
