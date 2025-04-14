[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Codec](https://docs.fuel.network/docs/nightly/fuels-rs/codec/) /

Decoding

## _Icon Link_ [Decoding](https://docs.fuel.network/docs/nightly/fuels-rs/codec/decoding/\#decoding)

Be sure to read the [prerequisites](https://docs.fuel.network/docs/nightly/nightly/#prerequisites-for-decodingencoding) to decoding.

Decoding is done via the [`ABIDecoder` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/codec/struct.ABIDecoder.html):

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    core::{
        codec::ABIDecoder,
        traits::{Parameterize, Tokenizable},
    },
    macros::{Parameterize, Tokenizable},
    types::Token,
};

#[derive(Parameterize, Tokenizable)]
struct MyStruct {
    field: u64,
}

let bytes: &[u8] = &[0, 0, 0, 0, 0, 0, 0, 101];

let token: Token = ABIDecoder::default().decode(&MyStruct::param_type(), bytes)?;

let _: MyStruct = MyStruct::from_token(token)?;
```

_Icon ClipboardText_

First into a [`Token` _Icon Link_](https://docs.rs/fuels/latest/fuels/types/enum.Token.html), then via the [`Tokenizable` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/traits/trait.Tokenizable.html) trait, into the desired type.

If the type came from [`abigen!`](https://docs.fuel.network/docs/nightly/fuels-rs/abigen/) (or uses the [`::fuels::macros::TryFrom` _Icon Link_](https://docs.rs/fuels/latest/fuels/macros/derive.TryFrom.html) derivation) then you can also use `try_into` to convert bytes into a type that implements both [`Parameterize` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/traits/trait.Parameterize.html) and [`Tokenizable` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/traits/trait.Tokenizable.html):

```fuel_Box fuel_Box-idXKMmm-css
use fuels::macros::{Parameterize, Tokenizable, TryFrom};

#[derive(Parameterize, Tokenizable, TryFrom)]
struct MyStruct {
    field: u64,
}

let bytes: &[u8] = &[0, 0, 0, 0, 0, 0, 0, 101];

let _: MyStruct = bytes.try_into()?;
```

_Icon ClipboardText_

Under the hood, [`try_from_bytes` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/codec/fn.try_from_bytes.html) is being called, which does what the preceding example did.

## _Icon Link_ [Configuring the decoder](https://docs.fuel.network/docs/nightly/fuels-rs/codec/decoding/\#configuring-the-decoder)

The decoder can be configured to limit its resource expenditure:

```fuel_Box fuel_Box-idXKMmm-css

use fuels::core::codec::ABIDecoder;

ABIDecoder::new(DecoderConfig {
    max_depth: 5,
    max_tokens: 100,
});
```

_Icon ClipboardText_

For an explanation of each configuration value visit the `DecoderConfig`.

The default values for the `DecoderConfig` are:

```fuel_Box fuel_Box-idXKMmm-css
impl Default for DecoderConfig {
    fn default() -> Self {
        Self {
            max_depth: 45,
            max_tokens: 10_000,
        }
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Configuring the decoder for contract/script calls](https://docs.fuel.network/docs/nightly/fuels-rs/codec/decoding/\#configuring-the-decoder-for-contractscript-calls)

You can also configure the decoder used to decode the return value of the contract method:

```fuel_Box fuel_Box-idXKMmm-css
let _ = contract_instance
    .methods()
    .initialize_counter(42)
    .with_decoder_config(DecoderConfig {
        max_depth: 10,
        max_tokens: 2_000,
    })
    .call()
    .await?;
```

_Icon ClipboardText_

The same method is available for script calls.