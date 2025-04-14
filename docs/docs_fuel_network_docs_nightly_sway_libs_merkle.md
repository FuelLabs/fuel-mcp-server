[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

Merkle

## _Icon Link_ [Merkle Library](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#merkle-library)

Merkle trees allow for on-chain verification of off-chain data. With the merkle root posted on-chain, the generation of proofs off-chain can provide verifiably true data.

For implementation details on the Merkle Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/merkle/index.html).

## _Icon Link_ [Importing the Merkle Library](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#importing-the-merkle-library)

In order to use the Merkle Library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/).

To import the Merkle Library to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::merkle::binary_proof::*;
```

_Icon ClipboardText_

## _Icon Link_ [Using the Merkle Proof Library In Sway](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#using-the-merkle-proof-library-in-sway)

Once imported, using the Merkle Proof library is as simple as calling the desired function. Here is a list of function definitions that you may use.

- `leaf_digest()`
- `node_digest()`
- `process_proof()`
- `verify_proof()`

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#basic-functionality)

## _Icon Link_ [Computing Leaves and Nodes](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#computing-leaves-and-nodes)

The Binary Proof currently allows for you to compute leaves and nodes of a merkle tree given the appropriate hash digest.

To compute a leaf use the `leaf_digest()` function:

```fuel_Box fuel_Box-idXKMmm-css
fn compute_leaf(hashed_data: b256) {
    let leaf: b256 = leaf_digest(hashed_data);
}
```

_Icon ClipboardText_

To compute a node given two leaves, use the `node_digest()` function:

```fuel_Box fuel_Box-idXKMmm-css
fn compute_node(leaf_a: b256, leaf_b: b256) {
    let node: b256 = node_digest(leaf_a, leaf_b);
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** Order matters when computing a node.

## _Icon Link_ [Computing the Merkle Root](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#computing-the-merkle-root)

To compute a Merkle root given a proof, use the `process_proof()` function.

```fuel_Box fuel_Box-idXKMmm-css
fn process(key: u64, leaf: b256, num_leaves: u64, proof: Vec<b256>) {
    let merkle_root: b256 = process_proof(key, leaf, num_leaves, proof);
}
```

_Icon ClipboardText_

## _Icon Link_ [Verifying a Proof](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#verifying-a-proof)

To verify a proof against a merkle root, use the `verify_proof()` function.

```fuel_Box fuel_Box-idXKMmm-css
fn verify(
    merkle_root: b256,
    key: u64,
    leaf: b256,
    num_leaves: u64,
    proof: Vec<b256>,
) {
    assert(verify_proof(key, leaf, merkle_root, num_leaves, proof));
}
```

_Icon ClipboardText_

## _Icon Link_ [Using the Merkle Proof Library with Fuels-rs](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#using-the-merkle-proof-library-with-fuels-rs)

To generate a Merkle Tree and corresponding proof for your Sway Smart Contract, use the [Fuel-Merkle _Icon Link_](https://github.com/FuelLabs/fuel-vm/tree/master/fuel-merkle) crate.

## _Icon Link_ [Importing Into Your Project](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#importing-into-your-project)

The import the Fuel-Merkle crate, the following should be added to the project's `Cargo.toml` file under `[dependencies]`:

```fuel_Box fuel_Box-idXKMmm-css
fuel-merkle = { version = "0.50.0" }
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** Make sure to use the latest version of the [fuel-merkle _Icon Link_](https://crates.io/crates/fuel-merkle) crate.

## _Icon Link_ [Importing Into Your Rust File](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#importing-into-your-rust-file)

The following should be added to your Rust file to use the Fuel-Merkle crate.

```fuel_Box fuel_Box-idXKMmm-css
use fuel_merkle::binary::in_memory::MerkleTree;
```

_Icon ClipboardText_

## _Icon Link_ [Using Fuel-Merkle](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#using-fuel-merkle)

## _Icon Link_ [Generating A Tree](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#generating-a-tree)

To create a merkle tree using Fuel-Merkle is as simple as pushing your leaves in increasing order.

```fuel_Box fuel_Box-idXKMmm-css
// Create a new Merkle Tree and define leaves
let mut tree = MerkleTree::new();
let leaves = [b"A", b"B", b"C"].to_vec();

// Hash the leaves and then push to the merkle tree
for datum in &leaves {
    let mut hasher = Sha256::new();
    hasher.update(datum);
    let hash = hasher.finalize();
    tree.push(&hash);
}
```

_Icon ClipboardText_

## _Icon Link_ [Generating And Verifying A Proof](https://docs.fuel.network/docs/nightly/sway-libs/merkle/\#generating-and-verifying-a-proof)

To generate a proof for a specific leaf, you must have the index or key of the leaf. Simply call the prove function:

```fuel_Box fuel_Box-idXKMmm-css
// Define the key or index of the leaf you want to prove and the number of leaves
let key: u64 = 0;

// Get the merkle root and proof set
let (merkle_root, proof_set) = tree.prove(key).unwrap();

// Convert the proof set from Vec<Bytes32> to Vec<Bits256>
let mut bits256_proof: Vec<Bits256> = Vec::new();
for itterator in proof_set {
    bits256_proof.push(Bits256(itterator));
}
```

_Icon ClipboardText_

Once the proof has been generated, you may call the Sway Smart Contract's `verify_proof` function:

```fuel_Box fuel_Box-idXKMmm-css
// Create the merkle leaf
let mut leaf_hasher = Sha256::new();
leaf_hasher.update(leaves[key as usize]);
let hashed_leaf_data = leaf_hasher.finalize();
let merkle_leaf = leaf_sum(&hashed_leaf_data);

// Get the number of leaves or data points
let num_leaves: u64 = leaves.len() as u64;

// Call the Sway contract to verify the generated merkle proof
let result: bool = contract_instance
    .methods()
    .verify(
        Bits256(merkle_root),
        key,
        Bits256(merkle_leaf),
        num_leaves,
        bits256_proof,
    )
    .call()
    .await
    .unwrap()
    .value;
assert!(result);
```

_Icon ClipboardText_