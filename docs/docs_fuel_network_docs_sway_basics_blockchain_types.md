[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Basics](https://docs.fuel.network/docs/sway/basics/) /

Blockchain Types

## _Icon Link_ [Blockchain Types](https://docs.fuel.network/docs/sway/basics/blockchain_types/\#blockchain-types)

Sway is fundamentally a blockchain language, and it offers a selection of types tailored for the blockchain use case.

These are provided via the standard library ( [`lib-std` _Icon Link_](https://github.com/FuelLabs/sway/tree/v0.67.0/sway-lib-std)) which both add a degree of type-safety, as well as make the intention of the developer more clear.

## _Icon Link_ [`Address` Type](https://docs.fuel.network/docs/sway/basics/blockchain_types/\#address-type)

The `Address` type is a type-safe wrapper around the primitive `b256` type. Unlike the EVM, an address **never** refers to a deployed smart contract (see the `ContractId` type below). An `Address` can be either the hash of a public key (effectively an [externally owned account _Icon Link_](https://ethereum.org/en/whitepaper/#ethereum-accounts) if you're coming from the EVM) or the hash of a [predicate](https://docs.fuel.network/docs/sway/sway-program-types/predicates/). Addresses own UTXOs.

An `Address` is implemented as follows.

```fuel_Box fuel_Box-idXKMmm-css
pub struct Address {
    value: b256,
}
```

_Icon ClipboardText_

Casting between the `b256` and `Address` types must be done explicitly:

```fuel_Box fuel_Box-idXKMmm-css
let my_number: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
let my_address: Address = Address::from(my_number);
let forty_two: b256 = my_address.into();
```

_Icon ClipboardText_

## _Icon Link_ [`ContractId` Type](https://docs.fuel.network/docs/sway/basics/blockchain_types/\#contractid-type)

The `ContractId` type is a type-safe wrapper around the primitive `b256` type. A contract's ID is a unique, deterministic identifier analogous to a contract's address in the EVM. Contracts cannot own UTXOs but can own assets.

A `ContractId` is implemented as follows.

```fuel_Box fuel_Box-idXKMmm-css
pub struct ContractId {
    value: b256,
}
```

_Icon ClipboardText_

Casting between the `b256` and `ContractId` types must be done explicitly:

```fuel_Box fuel_Box-idXKMmm-css
let my_number: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
let my_contract_id: ContractId = ContractId::from(my_number);
let forty_two: b256 = my_contract_id.into();
```

_Icon ClipboardText_

## _Icon Link_ [Getting a Contract's `ContractId`](https://docs.fuel.network/docs/sway/basics/blockchain_types/\#getting-a-contracts-contractid)

To get the `ContractId` of a contract in an internal context use the `ContractId::this()` function:

```fuel_Box fuel_Box-idXKMmm-css
impl MyContract for Contract {
    fn foo() {
        let this_contract_id: ContractId = ContractId::this();
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [`Identity` Type](https://docs.fuel.network/docs/sway/basics/blockchain_types/\#identity-type)

The `Identity` type is an enum that allows for the handling of both `Address` and `ContractId` types. This is useful in cases where either type is accepted, e.g., receiving funds from an identified sender, but not caring if the sender is an address or a contract.

An `Identity` is implemented as follows.

```fuel_Box fuel_Box-idXKMmm-css
pub enum Identity {
    Address: Address,
    ContractId: ContractId,
}
```

_Icon ClipboardText_

Casting to an `Identity` must be done explicitly:

```fuel_Box fuel_Box-idXKMmm-css
let raw_address: b256 = 0xddec0e7e6a9a4a4e3e57d08d080d71a299c628a46bc609aab4627695679421ca;
let my_identity: Identity = Identity::Address(Address::from(raw_address));
```

_Icon ClipboardText_

A `match` statement can be used to return to an `Address` or `ContractId` as well as handle cases in which their execution differs.

```fuel_Box fuel_Box-idXKMmm-css
let my_contract_id: ContractId = match my_identity {
    Identity::ContractId(identity) => identity,
    _ => revert(0),
};
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
match my_identity {
    Identity::Address(address) => takes_address(address),
    Identity::ContractId(contract_id) => takes_contract_id(contract_id),
};
```

_Icon ClipboardText_

A common use case for `Identity` is for access control. The use of `Identity` uniquely allows both `ContractId` and `Address` to have access control inclusively.

```fuel_Box fuel_Box-idXKMmm-css
let sender = msg_sender().unwrap();
require(
    sender == storage
        .owner
        .read(),
    MyError::UnauthorizedUser(sender),
);
```

_Icon ClipboardText_