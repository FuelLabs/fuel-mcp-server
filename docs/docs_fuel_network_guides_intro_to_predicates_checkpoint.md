[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Checkpoint

## _Icon Link_ [Checkpoint](https://docs.fuel.network/guides/intro-to-predicates/checkpoint/\#checkpoint)

If you have followed the steps properly, your predicate `main.sw` should look like the code below:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

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

configurable {
    REQUIRED_SIGNATURES: u64 = 0,
    SIGNERS: [Address; 3] = [\
        Address::from(0x0000000000000000000000000000000000000000000000000000000000000000),\
        Address::from(0x0000000000000000000000000000000000000000000000000000000000000000),\
        Address::from(0x0000000000000000000000000000000000000000000000000000000000000000)\
    ]
}

fn verify_signature(i: u64) -> u64 {
    // Discard any out of bounds signatures
    if (i >= tx_witnesses_count()) {
        return 0;
    }

    let tx_hash = tx_id();

    let mut j = 0;

    while j < 3 {
        let current_signature = tx_witness_data::<B512>(j).unwrap();

        let current_address = ec_recover_address(current_signature, tx_hash).unwrap();

        if current_address == SIGNERS[i] {
            return 1;
        }

        j += 1;
    }
    return 0;
}

fn main() -> bool {
    let mut valid_signatures = 0;

    // Verifiying each potential signature
    valid_signatures = verify_signature(0);
    valid_signatures = valid_signatures + verify_signature(1);
    valid_signatures = valid_signatures + verify_signature(2);

    if valid_signatures >= REQUIRED_SIGNATURES {
        return true;
    }
    return false;
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Building the predicate](https://docs.fuel.network/guides/intro-to-predicates/checkpoint/\#building-the-predicate)

To format your contract, execute the command:

```fuel_Box fuel_Box-idXKMmm-css
forc fmt
```

_Icon ClipboardText_

To get the predicate root, go to the predicate folder and run:

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

Your predicate root should be exactly:

```fuel_Box fuel_Box-idXKMmm-css
0x2d5e1058a695d6fd8bf30dfa1d8e987f99c9c99a6dd614103d2b4b0f11c1eb40
```

_Icon ClipboardText_

That's it! You've created your first **stateless** decentralized application, and we didn't even have to deploy it!