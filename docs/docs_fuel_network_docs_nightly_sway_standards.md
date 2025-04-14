[Docs](https://docs.fuel.network/) /

Nightly  /

Sway Standards

## _Icon Link_ [Sway Standards](https://docs.fuel.network/docs/nightly/sway-standards/\#sway-standards)

The purpose of the Sway Standards [repository _Icon Link_](https://github.com/FuelLabs/sway-standards) is to contain standards for the Sway Language which users can import and use.

Standards in this repository may be in various stages of development. Use of draft standards and feedback on the proposed standards is encouraged. To use a draft, search for a standard using the appropriate GitHub label and implement the standard ABI into your contract.

If you don't find what you're looking for, feel free to create an issue and propose a new standard!

> _Icon InfoCircle_
>
> **Note**
> All standards currently use `forc v0.67.0`.

## _Icon Link_ [Using a standard](https://docs.fuel.network/docs/nightly/sway-standards/\#using-a-standard)

To import a standard the following should be added to the project's `Forc.toml` file under `[dependencies]` with the most recent release:

```fuel_Box fuel_Box-idXKMmm-css
standards = { git = "https://github.com/FuelLabs/sway-standards", tag = "v0.7.0" }
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE:**
> Be sure to set the tag to the latest release.

You may then import your desired standard in your Sway Smart Contract as so:

```fuel_Box fuel_Box-idXKMmm-css
use standards::<standard>::<standard_abi>;
```

_Icon ClipboardText_

For example, to import the SRC-20 Native Asset Standard use the following statement in your Sway Smart Contract file:

```fuel_Box fuel_Box-idXKMmm-css
use standards::src20::SRC20;
```

_Icon ClipboardText_

## _Icon Link_ [Standards](https://docs.fuel.network/docs/nightly/sway-standards/\#standards)

## _Icon Link_ [Native Assets](https://docs.fuel.network/docs/nightly/sway-standards/\#native-assets)

- [SRC-20; Native Asset Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-20-native-asset/) defines the implementation of a standard API for [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets) using the Sway Language.
- [SRC-3; Mint and Burn](https://docs.fuel.network/docs/nightly/sway-standards/src-3-minting-and-burning/) is used to enable mint and burn functionality for fungible assets.
- [SRC-6; Vault Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-6-vault/) defines the implementation of a standard API for asset vaults developed in Sway.
- [SRC-13; Soulbound Address](https://docs.fuel.network/docs/nightly/sway-standards/src-13-soulbound-address/) defines the implementation of a soulbound address.

## _Icon Link_ [Metadata](https://docs.fuel.network/docs/nightly/sway-standards/\#metadata)

- [SRC-7; Onchain Asset Metadata Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-7-asset-metadata/) is used to store metadata for [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets).
- [SRC-9; Metadata Keys Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/) is used to store standardized metadata keys for [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets) in combination with the SRC-7 standard.
- [SRC-15; Offchain Asset Metadata Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-15-offchain-asset-metadata/) is used to associated metadata with [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets) offchain.

## _Icon Link_ [Security and Access Control](https://docs.fuel.network/docs/nightly/sway-standards/\#security-and-access-control)

- [SRC-5; Ownership Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-5-ownership/) is used to restrict function calls to admin users in contracts.
- [SRC-11; Security Information Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-11-security-information/) is used to make communication information readily available in the case white hat hackers find a vulnerability in a contract.

## _Icon Link_ [Contracts](https://docs.fuel.network/docs/nightly/sway-standards/\#contracts)

- [SRC-12; Contract Factory](https://docs.fuel.network/docs/nightly/sway-standards/src-12-contract-factory/) defines the implementation of a standard API for contract factories.
- [SRC-14; Simple Upgradeable Proxies](https://docs.fuel.network/docs/nightly/sway-standards/src-14-simple-upgradeable-proxies/) defines the implementation of an upgradeable proxy contract.

## _Icon Link_ [Bridge](https://docs.fuel.network/docs/nightly/sway-standards/\#bridge)

- [SRC-8; Bridged Asset](https://docs.fuel.network/docs/nightly/sway-standards/src-8-bridged-asset/) defines the metadata required for an asset bridged to the Fuel Network.
- [SRC-10; Native Bridge Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-10-native-bridge/) defines the standard API for the Native Bridge between the Fuel Chain and the canonical base chain.

## _Icon Link_ [Encoding and hashing](https://docs.fuel.network/docs/nightly/sway-standards/\#encoding-and-hashing)

- [SRC-16; Typed Structured Data](https://docs.fuel.network/docs/nightly/sway-standards/src-16-typed-structured-data/) defines standard encoding and hashing of typed structured data.

## _Icon Link_ [Documentation](https://docs.fuel.network/docs/nightly/sway-standards/\#documentation)

- [SRC-2; Inline Documentation](https://docs.fuel.network/docs/nightly/sway-standards/src-2-inline-documentation/) defines how to document your Sway files.