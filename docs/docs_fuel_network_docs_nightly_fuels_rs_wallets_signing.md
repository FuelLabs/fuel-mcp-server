[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/) /

Signing

## _Icon Link_ [Signing](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/signing/\#signing)

An example of how you might sign a message using any of the SDK signers (or your
own, custom ones, that implement `Signer`):

```fuel_Box fuel_Box-idXKMmm-css
let mut rng = StdRng::seed_from_u64(2322u64);
let mut secret_seed = [0u8; 32];
rng.fill_bytes(&mut secret_seed);

let secret = secret_seed.as_slice().try_into()?;

// Create a signer using the private key created above.
let signer = PrivateKeySigner::new(secret);

let message = Message::new("my message".as_bytes());
let signature = signer.sign(message).await?;

// Check if signature is what we expect it to be
assert_eq!(signature, Signature::from_str("0x8eeb238db1adea4152644f1cd827b552dfa9ab3f4939718bb45ca476d167c6512a656f4d4c7356bfb9561b14448c230c6e7e4bd781df5ee9e5999faa6495163d")?);

// Recover address that signed the message
let recovered_address = signature.recover(&message)?;

assert_eq!(signer.address().hash(), recovered_address.hash());

// Verify signature
signature.verify(&recovered_address, &message)?;
```

_Icon ClipboardText_

## _Icon Link_ [Adding `Signers` to a transaction builder](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/signing/\#adding-signers-to-a-transaction-builder)

Every signed resource in the inputs needs to have a witness index that points to a valid witness. Changing the witness index inside an input will change the transaction ID. This means that we need to set all witness indexes before finally signing the transaction. We have to make sure that the witness indexes and the order of the witnesses are correct. To automate this process, the SDK will keep track of the signers in the transaction builder and resolve the final transaction automatically. This is done by storing signers until the final transaction is built.

Below is a full example of how to create a transaction builder and add signers to it.

> _Icon InfoCircle_
>
> Note: When you add a `Signer` to a transaction builder, the signer is stored inside it and the transaction will not be resolved until you call `build()`!

```fuel_Box fuel_Box-idXKMmm-css
let secret = SecretKey::from_str(
    "5f70feeff1f229e4a95e1056e8b4d80d0b24b565674860cc213bdb07127ce1b1",
)?;
let signer = PrivateKeySigner::new(secret);

// Set up a transaction
let mut tb = {
    let input_coin = Input::ResourceSigned {
        resource: CoinType::Coin(Coin {
            amount: 10000000,
            owner: signer.address().clone(),
            ..Default::default()
        }),
    };

    let output_coin = Output::coin(
        Address::from_str(
            "0xc7862855b418ba8f58878db434b21053a61a2025209889cc115989e8040ff077",
        )?,
        1,
        Default::default(),
    );
    let change = Output::change(signer.address().into(), 0, Default::default());

    ScriptTransactionBuilder::prepare_transfer(
        vec![input_coin],
        vec![output_coin, change],
        Default::default(),
    )
};

// Add `Signer` to the transaction builder
tb.add_signer(signer.clone())?;
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Signing a built transaction](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/signing/\#signing-a-built-transaction)

If you have a built transaction and want to add a signature, you can use the `sign_with` method.

```fuel_Box fuel_Box-idXKMmm-css
tx.sign_with(wallet.signer(), consensus_parameters.chain_id())
    .await?;
```

_Icon ClipboardText_