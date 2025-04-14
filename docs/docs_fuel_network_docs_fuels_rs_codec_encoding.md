[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Codec](https://docs.fuel.network/docs/fuels-rs/codec/) /

Encoding

## _Icon Link_ [Encoding](https://docs.fuel.network/docs/fuels-rs/codec/encoding/\#encoding)

Be sure to read the [prerequisites](https://docs.fuel.network/docs/fuels-rs/#prerequisites-for-decodingencoding) to encoding.

Encoding is done via the [`ABIEncoder` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/codec/struct.ABIEncoder.html):

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    core::{codec::ABIEncoder, traits::Tokenizable},
    macros::Tokenizable,
};

#[derive(Tokenizable)]
struct MyStruct {
    field: u64,
}

let instance = MyStruct { field: 101 };
let _encoded: Vec<u8> = ABIEncoder::default().encode(&[instance.into_token()])?;
```

_Icon ClipboardText_

There is also a shortcut-macro that can encode multiple types which implement [`Tokenizable` _Icon Link_](https://docs.rs/fuels/latest/fuels/core/traits/trait.Tokenizable.html):

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{core::codec::calldata, macros::Tokenizable};

#[derive(Tokenizable)]
struct MyStruct {
    field: u64,
}
let _: Vec<u8> = calldata!(MyStruct { field: 101 }, MyStruct { field: 102 })?;
```

_Icon ClipboardText_

## _Icon Link_ [Configuring the encoder](https://docs.fuel.network/docs/fuels-rs/codec/encoding/\#configuring-the-encoder)

The encoder can be configured to limit its resource expenditure:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::core::codec::ABIEncoder;

ABIEncoder::new(EncoderConfig {
    max_depth: 5,
    max_tokens: 100,
});
```

_Icon ClipboardText_

The default values for the `EncoderConfig` are:

```fuel_Box fuel_Box-idXKMmm-css
impl Default for EncoderConfig {
    fn default() -> Self {
        Self {
            max_depth: 45,
            max_tokens: 10_000,
        }
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Configuring the encoder for contract/script calls](https://docs.fuel.network/docs/fuels-rs/codec/encoding/\#configuring-the-encoder-for-contractscript-calls)

You can also configure the encoder used to encode the arguments of the contract method:

```fuel_Box fuel_Box-idXKMmm-css
let _ = contract_instance
    .with_encoder_config(EncoderConfig {
        max_depth: 10,
        max_tokens: 2_000,
    })
    .methods()
    .initialize_counter(42)
    .call()
    .await?;
```

_Icon ClipboardText_

The same method is available for script calls.