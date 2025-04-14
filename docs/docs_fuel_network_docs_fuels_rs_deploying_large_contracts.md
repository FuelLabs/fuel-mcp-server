[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Deploying](https://docs.fuel.network/docs/fuels-rs/deploying/) /

Large Contracts

## _Icon Link_ [Deploying Large Contracts](https://docs.fuel.network/docs/fuels-rs/deploying/large_contracts/\#deploying-large-contracts)

If your contract exceeds the size limit for a single deployment:

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?;
let max_allowed = provider
    .consensus_parameters()
    .await?
    .contract_params()
    .contract_max_size();

assert!(contract.code().len() as u64 > max_allowed);
```

_Icon ClipboardText_

you can deploy it in segments using a partitioned approach:

```fuel_Box fuel_Box-idXKMmm-css
let max_words_per_blob = 10_000;
let contract_id = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?
.convert_to_loader(max_words_per_blob)?
.deploy(&wallet, TxPolicies::default())
.await?;
```

_Icon ClipboardText_

When you convert a standard contract into a loader contract, the following changes occur:

- The original contract code is replaced with the loader contract code.
- The original contract code is split into blobs, which will be deployed via blob transactions before deploying the contract itself.
- The new loader code, when invoked, loads these blobs into memory and executes your original contract.

After deploying the loader contract, you can interact with it just as you would with a standard contract:

```fuel_Box fuel_Box-idXKMmm-css
let contract_instance = MyContract::new(contract_id, wallet);
let response = contract_instance.methods().something().call().await?.value;
assert_eq!(response, 1001);
```

_Icon ClipboardText_

A helper function is available to deploy your contract normally if it is within the size limit, or as a loader contract if it exceeds the limit:

```fuel_Box fuel_Box-idXKMmm-css
let max_words_per_blob = 10_000;
let contract_id = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?
.smart_deploy(&wallet, TxPolicies::default(), max_words_per_blob)
.await?;
```

_Icon ClipboardText_

You also have the option to separate the blob upload from the contract deployment for more granular control:

```fuel_Box fuel_Box-idXKMmm-css
let contract_id = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?
.convert_to_loader(max_words_per_blob)?
.upload_blobs(&wallet, TxPolicies::default())
.await?
.deploy(&wallet, TxPolicies::default())
.await?;
```

_Icon ClipboardText_

Alternatively, you can manually split your contract code into blobs and then create and deploy a loader:

```fuel_Box fuel_Box-idXKMmm-css
let chunk_size = 100_000;
assert!(
    chunk_size % 8 == 0,
    "all chunks, except the last, must be word-aligned"
);
let blobs = contract
    .code()
    .chunks(chunk_size)
    .map(|chunk| Blob::new(chunk.to_vec()))
    .collect();

let contract_id = Contract::loader_from_blobs(blobs, random_salt(), vec![])?
    .deploy(&wallet, TxPolicies::default())
    .await?;
```

_Icon ClipboardText_

Or you can upload the blobs yourself and proceed with just the loader deployment:

```fuel_Box fuel_Box-idXKMmm-css
let max_words_per_blob = 10_000;
let blobs = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?
.convert_to_loader(max_words_per_blob)?
.blobs()
.to_vec();

let mut all_blob_ids = vec![];
let mut already_uploaded_blobs = HashSet::new();
for blob in blobs {
    let blob_id = blob.id();
    all_blob_ids.push(blob_id);

    // uploading the same blob twice is not allowed
    if already_uploaded_blobs.contains(&blob_id) {
        continue;
    }

    let mut tb = BlobTransactionBuilder::default().with_blob(blob);
    wallet.adjust_for_fee(&mut tb, 0).await?;
    wallet.add_witnesses(&mut tb)?;

    let tx = tb.build(&provider).await?;
    provider
        .send_transaction_and_await_commit(tx)
        .await?
        .check(None)?;

    already_uploaded_blobs.insert(blob_id);
}

let contract_id = Contract::loader_from_blob_ids(all_blob_ids, random_salt(), vec![])?
    .deploy(&wallet, TxPolicies::default())
    .await?;
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Blob Size Considerations](https://docs.fuel.network/docs/fuels-rs/deploying/large_contracts/\#blob-size-considerations)

The size of a Blob transaction is constrained by three factors:

1. The maximum size of a single transaction:

```fuel_Box fuel_Box-idXKMmm-css
provider
    .consensus_parameters()
    .await?
    .tx_params()
    .max_size();
```

_Icon ClipboardText_

2. The maximum gas usage for a single transaction:

```fuel_Box fuel_Box-idXKMmm-css
provider
    .consensus_parameters()
    .await?
    .tx_params()
    .max_gas_per_tx();
```

_Icon ClipboardText_

3. The maximum HTTP body size accepted by the Fuel node.

To estimate an appropriate size for your blobs, you can run:

```fuel_Box fuel_Box-idXKMmm-css
let max_blob_size = BlobTransactionBuilder::default()
    .estimate_max_blob_size(&provider)
    .await?;
```

_Icon ClipboardText_

However, keep in mind the following limitations:

- The estimation only considers the maximum transaction size, not the max gas usage or HTTP body limit.
- It does not account for any size increase that may occur after the transaction is funded.

Therefore, it is advisable to make your blobs a few percent smaller than the estimated maximum size.