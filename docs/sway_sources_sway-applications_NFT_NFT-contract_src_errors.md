# Example: sway_sources/sway-applications/NFT/NFT-contract/src/errors.sw

```sway
library;

pub enum MintError {
    CannotMintMoreThanOneNFTWithSubId: (),
    MaxNFTsMinted: (),
    NFTAlreadyMinted: (),
}

pub enum SetError {
    ValueAlreadySet: (),
}

```
