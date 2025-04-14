[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

B512

## _Icon Link_ [`B512`](https://docs.fuel.network/docs/nightly/fuels-rs/types/b512/\#b512)

In the Rust SDK, the `B512` definition matches the Sway standard library type with the same name and will be converted accordingly when interacting with contracts:

```fuel_Box fuel_Box-idXKMmm-css
pub struct B512 {
    pub bytes: [Bits256; 2],
}
```

_Icon ClipboardText_

Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
let hi_bits = Bits256::from_hex_str(
    "0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c",
)?;
let lo_bits = Bits256::from_hex_str(
    "0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d",
)?;
let b512 = B512::from((hi_bits, lo_bits));
```

_Icon ClipboardText_