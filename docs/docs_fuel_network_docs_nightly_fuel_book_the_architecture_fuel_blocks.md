[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuel Book](https://docs.fuel.network/docs/nightly/fuel-book/) /

[The Architecture](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/) /

Fuel Blocks

## _Icon Link_ [Fuel Blocks](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#fuel-blocks)

Highlights:

- In Fuel, blocks are constructed by Block Builders, who process both transactions and messages to create the blocks. Users send transactions either directly to the builder or through layer 1, while messages originate from layer 1. The Fuel and Ethereum section of the book provides further details on this process.

- Each Fuel block begins with a header that consists of three main fields: the Application Header, the Consensus Header, and Block Header Metadata. This structure facilitates efficient management and processing of block-related information.

- The Application Header records critical operational details for the Fuel rollup, comprising four essential components: the da\_height, consensus\_parameters\_version, state\_transition\_bytecode\_version, and generated fields. These components work together to ensure the rollup operates correctly and efficiently.

- The Consensus Header tracks the hash of the Application Header, providing a secure and verifiable method for maintaining consensus within the Fuel network. This header is crucial for ensuring the integrity of the block.

- Fuel blocks also include a Coinbase transaction, which enables block producers to collect fees for their work. This Mint transaction must be the last in the block and is capped at the total fees processed from all transactions within that block, ensuring a fair and controlled fee structure.


Blocks in Fuel are built by entities called Block Builders. Fuel blocks are made by processing transactions and messages. Transactions can be sent directly to the builder or via layer 1, while messages are sent from layer 1. In the Fuel and Ethereum section of the book, we expand further on messages and transactions sent from the L1.

## _Icon Link_ [Block Header](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#block-header)

A Fuel block header at the top consists of three fields:

- Application Header
- Consensus Header
- Block Header Metadata

```fuel_Box fuel_Box-idXKMmm-css
pub struct BlockHeaderV1 {

    pub application: ApplicationHeader<GeneratedApplicationFields>,

    pub consensus: ConsensusHeader<GeneratedConsensusFields>,

    metadata: Option<BlockHeaderMetadata>,
}
```

_Icon ClipboardText_

## _Icon Link_ [Application Header](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#application-header)

The application header records essential information regarding the operation of the Fuel rollup.

The application header at the high level consists of four essential components:

```fuel_Box fuel_Box-idXKMmm-css
pub struct ApplicationHeader<Generated> {

    pub da_height: DaBlockHeight,

    pub consensus_parameters_version: ConsensusParametersVersion,

    pub state_transition_bytecode_version: StateTransitionBytecodeVersion,

    pub generated: Generated,
}
```

_Icon ClipboardText_

## _Icon Link_ [da\_height](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#da_height)

The `da_height` field records the latest block L1 block until the messages sent from the L1 → L2 have been processed; this is helpful later in fraud proving to establish that a particular message was sent from the L1 to the L2 rollup but wasn’t processed as part of the block that included the messages up to the block of which it was part.

## _Icon Link_ [consensus\_parameters\_version](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#consensus_parameters_version)

The Fuel rollup has a set of upgradeable [consensus parameters _Icon Link_](https://docs.fuel.network/docs/specs/tx-format/consensus_parameters/#consensus-parameters), which are upgradable via Transactions of type `Upgrade`. For each consensus parameter upgrade, a new version for `consensus_paramters_version` must be assigned, helping us track which set of consensus parameters we are using while building a particular block.

## _Icon Link_ [state\_transition\_bytecode\_version](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#state_transition_bytecode_version)

The Fuel rollups keep the WASM compiled bytecode of their state transition function as part of the chain facilitating forkless upgrades for the Fuel rollups.

The new state transition function is uploaded via the `Upload` transactions, while the upgrade is done via the `Upgrade` transactions. Each upgrade updates the `state_transition_bytecode_version`, and this version helps keep track of which state transition function is being used to process transactions for a given block.

## _Icon Link_ [generated](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#generated)

The section contains various rollup-specific fields around execution for a specific block. The Fuel flagship rollup has the following fields for `generated`:

```fuel_Box fuel_Box-idXKMmm-css
pub struct GeneratedApplicationFields {
    /// Number of transactions in this block.
    pub transactions_count: u16,
    /// Number of message receipts in this block.
    pub message_receipt_count: u32,
    /// Merkle root of transactions.
    pub transactions_root: Bytes32,
    /// Merkle root of message receipts in this block.
    pub message_outbox_root: Bytes32,
    /// Root hash of all imported events from L1
    pub event_inbox_root: Bytes32,
}
```

_Icon ClipboardText_

## _Icon Link_ [Consensus Header](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#consensus-header)

The consensus header is another top-level field for the Block Header for Fuel rollups, it is configurable and for the flagship Fuel rollup only keeps track of the hash of the Application Header.

```fuel_Box fuel_Box-idXKMmm-css
pub struct GeneratedConsensusFields {
    /// Hash of the application header.
    pub application_hash: Bytes32,
}
```

_Icon ClipboardText_

## _Icon Link_ [Block Header Metadata](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#block-header-metadata)

The Block Header Metadata is used to track metadata. The current flagship Fuel rollup includes a field tracking the block ID, which represents the hash of the block header.

```fuel_Box fuel_Box-idXKMmm-css
pub struct BlockHeaderMetadata {
    /// Hash of the header.
    id: BlockId,
}
```

_Icon ClipboardText_

## _Icon Link_ [Coinbase Transaction](https://docs.fuel.network/docs/nightly/fuel-book/the-architecture/fuel-blocks/\#coinbase-transaction)

Fuel blocks contain a Coinbase transaction; block producers use Coinbase transactions to collect fees for building blocks. The Coinbase transaction is a `Mint` transaction, where the `mintAmount` cannot exceed the fees processed from all transactions in the block. The protocol also requires the Coinbase transaction to always be the last transaction in the block.