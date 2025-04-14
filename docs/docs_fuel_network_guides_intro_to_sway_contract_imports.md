[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Imports

## _Icon Link_ [Imports](https://docs.fuel.network/guides/intro-to-sway/contract-imports/\#imports)

The [Sway standard library _Icon Link_](https://fuellabs.github.io/sway/master/std/) provides several utility types and methods we can use in our contract. To import a library, you can use the `use` keyword and `::`, also called a namespace qualifier, to chain library names like this:

```fuel_Box fuel_Box-idXKMmm-css
use std::auth::msg_sender;
```

_Icon ClipboardText_

You can also group together imports using curly brackets:

```fuel_Box fuel_Box-idXKMmm-css
use std::{
	auth::msg_sender,
	storage::StorageVec,
}
```

_Icon ClipboardText_

For this contract, here is what needs to be imported. Copy this to your `main.sw` file:

```fuel_Box fuel_Box-idXKMmm-css
use std::{
    auth::msg_sender,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    asset::transfer,
    hash::Hash,
};
```

_Icon ClipboardText_

We'll go through what each of these imports does as we use them in the next steps.