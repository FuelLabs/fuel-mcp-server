# Example: sway_sources/sway-applications/NFT/NFT-contract/src/interface.sw

```sway
library;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Identity);
}

```
