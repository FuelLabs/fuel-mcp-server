[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

Preuploading Code

## _Icon Link_ [Pre-uploading code](https://docs.fuel.network/docs/fuels-rs/preuploading-code/\#pre-uploading-code)

If you have a script or predicate that is larger than normal or which you plan
on calling often, you can pre-upload its code as a blob to the network and run a
loader script/predicate instead. The loader can be configured with the
script/predicate configurables, so you can change how the script/predicate is
configured on each run without having large transactions due to the code
duplication.

## _Icon Link_ [Scripts](https://docs.fuel.network/docs/fuels-rs/preuploading-code/\#scripts)

A high level pre-upload:

```fuel_Box fuel_Box-idXKMmm-css
my_script.convert_into_loader().await?.main().call().await?;
```

_Icon ClipboardText_

The upload of the blob is handled inside of the `convert_into_loader` method. If you
want more fine-grained control over it, you can create the script transaction
manually:

```fuel_Box fuel_Box-idXKMmm-css
let regular = Executable::load_from(binary_path)?;

let configurables = MyScriptConfigurables::default().with_SECRET_NUMBER(10001)?;
let loader = regular
    .convert_to_loader()?
    .with_configurables(configurables);

// The Blob must be uploaded manually, otherwise the script code will revert.
loader.upload_blob(wallet.clone()).await?;

let encoder = fuels::core::codec::ABIEncoder::default();
let token = MyStruct {
    field_a: MyEnum::B(99),
    field_b: Bits256([17; 32]),
}
.into_token();
let data = encoder.encode(&[token])?;

let mut tb = ScriptTransactionBuilder::default()
    .with_script(loader.code())
    .with_script_data(data);

wallet.adjust_for_fee(&mut tb, 0).await?;

wallet.add_witnesses(&mut tb)?;

let tx = tb.build(&provider).await?;

let response = provider.send_transaction_and_await_commit(tx).await?;

response.check(None)?;
```

_Icon ClipboardText_

## _Icon Link_ [Predicates](https://docs.fuel.network/docs/fuels-rs/preuploading-code/\#predicates)

You can prepare a predicate for pre-uploading without doing network requests:

```fuel_Box fuel_Box-idXKMmm-css
let configurables = MyPredicateConfigurables::default().with_SECRET_NUMBER(10001)?;

let predicate_data = MyPredicateEncoder::default().encode_data(1, 19)?;

let executable =
    Executable::load_from("sway/predicates/predicate_blobs/out/release/predicate_blobs.bin")?;

let loader = executable
    .convert_to_loader()?
    .with_configurables(configurables);

let mut predicate: Predicate = Predicate::from_code(loader.code()).with_data(predicate_data);
```

_Icon ClipboardText_

Once you want to execute the predicate, you must beforehand upload the blob
containing its code:

```fuel_Box fuel_Box-idXKMmm-css
loader.upload_blob(extra_wallet).await?;

predicate.set_provider(provider.clone());

let expected_fee = 1;
predicate
    .transfer(
        receiver.address(),
        predicate_balance - expected_fee,
        asset_id,
        TxPolicies::default(),
    )
    .await?;
```

_Icon ClipboardText_

By pre-uploading the predicate code, you allow for cheaper calls to the predicate
from subsequent callers.