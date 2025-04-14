[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

Bytecode

## _Icon Link_ [Bytecode Library](https://docs.fuel.network/docs/sway-libs/bytecode/\#bytecode-library)

The Bytecode Library allows for on-chain verification and computation of bytecode roots for contracts and predicates.

A bytecode root for a contract and predicate is the Merkle root of the [binary Merkle tree _Icon Link_](https://github.com/FuelLabs/fuel-specs/blob/master/src/protocol/cryptographic-primitives.md#binary-merkle-tree) with each leaf being 16KiB of instructions. This library will compute any contract's or predicate's bytecode root/address allowing for the verification of deployed contracts and generation of predicate addresses on-chain.

For implementation details on the Bytecode Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/bytecode/index.html).

## _Icon Link_ [Importing the Bytecode Library](https://docs.fuel.network/docs/sway-libs/bytecode/\#importing-the-bytecode-library)

In order to use the Bytecode Library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/).

To import the Bytecode Library to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::bytecode::*;
```

_Icon ClipboardText_

## _Icon Link_ [Using the Bytecode Library In Sway](https://docs.fuel.network/docs/sway-libs/bytecode/\#using-the-bytecode-library-in-sway)

Once imported, using the Bytecode Library is as simple as calling the desired function. Here is a list of function definitions that you may use.

- `compute_bytecode_root()`
- `compute_bytecode_root_with_configurables()`
- `compute_predicate_address()`
- `compute_predicate_address_with_configurables()`
- `predicate_address_from_root()`
- `swap_configurables()`
- `verify_contract_bytecode()`
- `verify_contract_bytecode_with_configurables()`
- `verify_predicate_address()`
- `verify_predicate_address_with_configurables()`

## _Icon Link_ [Known Issues](https://docs.fuel.network/docs/sway-libs/bytecode/\#known-issues)

Please note that if you are passing the bytecode from the SDK and are including configurable values, the `Vec<u8>` bytecode provided must be copied to be mutable. The following can be added to make your bytecode mutable:

```fuel_Box fuel_Box-idXKMmm-css
fn make_mutable(not_mutable_bytecode: Vec<u8>) {
    // Copy the bytecode to a newly allocated memory to avoid memory ownership error.
    let mut bytecode_slice = raw_slice::from_parts::<u8>(
        alloc_bytes(not_mutable_bytecode.len()),
        not_mutable_bytecode
            .len(),
    );
    not_mutable_bytecode
        .ptr()
        .copy_bytes_to(bytecode_slice.ptr(), not_mutable_bytecode.len());
    let mut bytecode_vec = Vec::from(bytecode_slice);
    // You may now use `bytecode_vec` in your computation and verification function calls
}
```

_Icon ClipboardText_

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/sway-libs/bytecode/\#basic-functionality)

The examples below are intended for internal contract calls. If you are passing bytecode from the SDK, please follow the steps listed above in known issues to avoid the memory ownership error.

## _Icon Link_ [Swapping Configurables](https://docs.fuel.network/docs/sway-libs/bytecode/\#swapping-configurables)

Given some bytecode, you may swap the configurables of both Contracts and Predicates by calling the `swap_configurables()` function.

```fuel_Box fuel_Box-idXKMmm-css
fn swap(
    my_bytecode: Vec<u8>,
    my_configurables: ContractConfigurables,
) {
    let mut my_bytecode = my_bytecode;
    let resulting_bytecode: Vec<u8> = swap_configurables(my_bytecode, my_configurables);
}
```

_Icon ClipboardText_

## _Icon Link_ [Contracts](https://docs.fuel.network/docs/sway-libs/bytecode/\#contracts)

## _Icon Link_ [Computing the Bytecode Root](https://docs.fuel.network/docs/sway-libs/bytecode/\#computing-the-bytecode-root)

To compute a contract's bytecode root you may call the `compute_bytecode_root()` or `compute_bytecode_root_with_configurables()` functions.

```fuel_Box fuel_Box-idXKMmm-css
fn compute_bytecode(my_bytecode: Vec<u8>) {
    let root: BytecodeRoot = compute_bytecode_root(my_bytecode);
}

fn compute_bytecode_configurables(
    my_bytecode: Vec<u8>,
    my_configurables: ContractConfigurables,
) {
    let mut my_bytecode = my_bytecode;
    let root: BytecodeRoot = compute_bytecode_root_with_configurables(my_bytecode, my_configurables);
}
```

_Icon ClipboardText_

## _Icon Link_ [Verifying a Contract's Bytecode Root](https://docs.fuel.network/docs/sway-libs/bytecode/\#verifying-a-contracts-bytecode-root)

To verify a contract's bytecode root you may call `verify_bytecode_root()` or `verify_contract_bytecode_with_configurables()` functions.

```fuel_Box fuel_Box-idXKMmm-css
fn verify_contract(my_contract: ContractId, my_bytecode: Vec<u8>) {
    verify_contract_bytecode(my_contract, my_bytecode);
    // By reaching this line the contract has been verified to match the bytecode provided.
}

fn verify_contract_configurables(
    my_contract: ContractId,
    my_bytecode: Vec<u8>,
    my_configurables: ContractConfigurables,
) {
    let mut my_bytecode = my_bytecode;
    verify_contract_bytecode_with_configurables(my_contract, my_bytecode, my_configurables);
    // By reaching this line the contract has been verified to match the bytecode provided.
}
```

_Icon ClipboardText_

## _Icon Link_ [Predicates](https://docs.fuel.network/docs/sway-libs/bytecode/\#predicates)

## _Icon Link_ [Computing the Address from Bytecode](https://docs.fuel.network/docs/sway-libs/bytecode/\#computing-the-address-from-bytecode)

To compute a predicate's address you may call the `compute_predicate_address()` or `compute_predicate_address_with_configurables()` functions.

```fuel_Box fuel_Box-idXKMmm-css
fn compute_predicate(my_bytecode: Vec<u8>) {
    let address: Address = compute_predicate_address(my_bytecode);
}

fn compute_predicate_configurables(
    my_bytecode: Vec<u8>,
    my_configurables: ContractConfigurables,
) {
    let mut my_bytecode = my_bytecode;
    let address: Address = compute_predicate_address_with_configurables(my_bytecode, my_configurables);
}
```

_Icon ClipboardText_

## _Icon Link_ [Computing the Address from a Root](https://docs.fuel.network/docs/sway-libs/bytecode/\#computing-the-address-from-a-root)

If you have the root of a predicate, you may compute it's corresponding predicate address by calling the `predicate_address_from_root()` function.

```fuel_Box fuel_Box-idXKMmm-css
fn predicate_address(my_root: BytecodeRoot) {
    let address: Address = predicate_address_from_root(my_root);
}
```

_Icon ClipboardText_

## _Icon Link_ [Verifying the Address](https://docs.fuel.network/docs/sway-libs/bytecode/\#verifying-the-address)

To verify a predicates's address you may call `verify_predicate_address()` or `verify_predicate_address_with_configurables()` functions.

```fuel_Box fuel_Box-idXKMmm-css
fn verify_predicate(my_predicate: Address, my_bytecode: Vec<u8>) {
    verify_predicate_address(my_predicate, my_bytecode);
    // By reaching this line the predicate bytecode matches the address provided.
}

fn verify_predicate_configurables(
    my_predicate: Address,
    my_bytecode: Vec<u8>,
    my_configurables: ContractConfigurables,
) {
    let mut my_bytecode = my_bytecode;
    verify_predicate_address_with_configurables(my_predicate, my_bytecode, my_configurables);
    // By reaching this line the predicate bytecode matches the address provided.
}
```

_Icon ClipboardText_