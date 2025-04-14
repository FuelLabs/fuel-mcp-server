[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Crypto

## _Icon Link_ [Forc](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

Usage: forc-crypto

Commands: keccak256 Hashes the argument or file with this algorithm sha256 Hashes the argument or file with this algorithm address Converts an address to another format get-public-key Get the public key from a message and its signature new-key Creates a new key for use with fuel-core parse-secret Parses a private key to view the associated public key vanity Generate a vanity address help Print this message or the help of the given subcommand(s)

Options:

`-h`, `--help`

Print help

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Hashes an argument with SHA256](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto sha256 test

## _Icon Link_ [Hashes an argument with Keccak256](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto keccak256 test

## _Icon Link_ [Hashes a file path with SHA256](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto sha256 {file}

## _Icon Link_ [Hashes a file path with Keccak256](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto keccak256 {file}

## _Icon Link_ [Convert an address to another format](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto address fuel12e0xwx34nfp7jrzvn9mp5qkac3yvp7h8fx37ghl7klf82vv2wkys6wd523

## _Icon Link_ [Creates a new key default for block production](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto new-key

## _Icon Link_ [Creates a new key for peering](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto new-key -k peering

## _Icon Link_ [Creates a new key for block production](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto new-key -k block-production

## _Icon Link_ [Parses the secret of a block production](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto parse-secret "f5204427d0ab9a311266c96a377f7c329cb8a41b9088225b6fcf40eefb423e28"

## _Icon Link_ [Parses the secret of a peering](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto parse-secret -k peering "f5204427d0ab9a311266c96a377f7c329cb8a41b9088225b6fcf40eefb423e28"

## _Icon Link_ [Get the public key from a message and its signature](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto get-public-key

0x1eff08081394b72239a0cf7ff6b499213dcb7a338bedbd75d072d504588ef27a1f74d5ceb2f111ec02ede097fb09ed00aa9867922ed39299dae0b1afc0fa8661

"This is a message that is signed"

## _Icon Link_ [Generate a checksummed vanity address with a given prefix](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto vanity --starts-with "aaa"

## _Icon Link_ [Generate a checksummed vanity address with a given suffix](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto vanity --ends-with "aaa"

## _Icon Link_ [Generate a checksummed vanity address with a given prefix and suffix](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto vanity --starts-with "00" --ends-with "ff"

## _Icon Link_ [Generate a checksummed vanity address with a given regex pattern](https://docs.fuel.network/docs/nightly/forc/plugins/forc_crypto/\#forc-crypto)

forc crypto vanity --regex "^00.\*ff$"