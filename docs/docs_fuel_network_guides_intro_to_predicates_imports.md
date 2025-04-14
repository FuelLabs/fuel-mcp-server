[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Imports

## _Icon Link_ [Imports](https://docs.fuel.network/guides/intro-to-predicates/imports/\#imports)

The predicate keyword is used to identify that the program is a predicate.

```fuel_Box fuel_Box-idXKMmm-css
predicate;
```

_Icon ClipboardText_

We're going to utilize the [Sway standard library _Icon Link_](https://github.com/FuelLabs/sway/tree/v0.67.0/sway-lib-std) in our predicate. Delete the template code except for the predicate keyword and copy in the imports below:

```fuel_Box fuel_Box-idXKMmm-css
use std::{
    tx::{
        tx_witness_data,
        tx_witnesses_count,
        tx_id
    },
    constants::ZERO_B256,
    b512::B512,
    ecr::ec_recover_address
};
```

_Icon ClipboardText_

## _Icon Link_ [Transactions](https://docs.fuel.network/guides/intro-to-predicates/imports/\#transactions)

To construct the MultiSig, it's essential for us to obtain three specific components from the transaction through the standard library:

```fuel_Box fuel_Box-idXKMmm-css
tx::{
    tx_witness_data,
    tx_witnesses_count,
    tx_id
},
```

_Icon ClipboardText_

1. Transaction Witness Data: We'll use this to attach signatures on the transaction.
2. Transaction Witness Count: This will help us determine the number of signatures attached.
3. Transaction ID: The hash of the transaction.

## _Icon Link_ [Constants](https://docs.fuel.network/guides/intro-to-predicates/imports/\#constants)

From the constants library, we'll be using `ZERO_B256` as a placeholder.

```fuel_Box fuel_Box-idXKMmm-css
constants::ZERO_B256,
```

_Icon ClipboardText_

## _Icon Link_ [Signatures](https://docs.fuel.network/guides/intro-to-predicates/imports/\#signatures)

We'll need `b512` because signatures are of type `b512`.

```fuel_Box fuel_Box-idXKMmm-css
b512::B512,
```

_Icon ClipboardText_

## _Icon Link_ [Elliptical Curve](https://docs.fuel.network/guides/intro-to-predicates/imports/\#elliptical-curve)

Lastly, we will be using `ec_recover_address`, short for elliptical curve recovery address. It's a function that allows us to cryptographically recover the address that signed a piece of data:

```fuel_Box fuel_Box-idXKMmm-css
signing_address = ec_recover_address(signed_data, original_data)
```

_Icon ClipboardText_

This step is crucial for safeguarding the funds and ensuring that only the correct wallets can provide the necessary signatures.

```fuel_Box fuel_Box-idXKMmm-css
ecr::ec_recover_address
```

_Icon ClipboardText_