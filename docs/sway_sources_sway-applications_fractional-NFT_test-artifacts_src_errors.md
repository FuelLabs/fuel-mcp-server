# Example: sway_sources/sway-applications/fractional-NFT/test-artifacts/src/errors.sw

```sway
library;

pub enum MintError {
    CannotMintMoreThanOneNFTWithSubId: (),
    MaxNFTsMinted: (),
    NFTAlreadyMinted: (),
}

```
