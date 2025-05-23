[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Client

## _Icon Link_ [forc-client](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#forc-client)

The forc plugin for interacting with a Fuel node.

Since transactions are going to require some gas, you need to sign them with an account that has enough coins to pay for them.

We offer multiple ways to sign the transaction:

1. Sign the transaction via your local wallet using `forc-client` which integrates with our CLI wallet, `forc-wallet`.
2. Use the default signer to deploy to a local node
3. Use `forc-wallet` to manually sign transactions, and copy the signed transaction back to `forc-client`.

The easiest and recommended way to interact with deployed networks such as our testnets is option 1, using `forc-client` to sign your transactions which reads your default `forc-wallet` vault. For interacting with local node, we recommend using the second option, which leads `forc-client` to sign transactions with the private key that comes pre-funded in local environments.

## _Icon Link_ [Option 1: Sign transactions via forc-client using your local forc-wallet vault](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#option-1-sign-transactions-via-forc-client-using-your-local-forc-wallet-vault)

If you've used `forc-wallet` before, you'll already have a secure, password-protected vault holding your private key written to your file-system. `forc-client` is compatible with `forc-wallet` such that it can read that vault by asking you your password and use your account to sign transactions.

Example:

```fuel_Box fuel_Box-idXKMmm-css
> forc deploy

    Building /Users/yourname/test-projects/test-contract
    Finished release [optimized + fuel] target(s) in 11.39s
  Confirming transactions [deploy impl-contract]
             Network: https://testnet.fuel.network
             Wallet: /Users/yourname/.fuel/wallets/.wallet
✔ Wallet password · ********
? Wallet account ›
❯ [0] fuel12pls73y9hnqdqthvduy2x44x48zt8s50pkerf32kq26f2afeqdwq6rj9ar - 0.002197245 ETH
  [1] fuel1vzrm6kw9s3tv85gl25lpptsxrdguyzfhq6c8rk07tr6ft5g45nwqqh0uty - 0.001963631 ETH
? Do you agree to sign 1 transaction? (y/n) › yes
     Finished deploying impl-contract https://app.fuel.network/contract/0x94b712901f04332682d14c998a5fc5a078ed15321438f46d58d0383200cde43d
     Deployed in block https://app.fuel.network/block/5958351
```

_Icon ClipboardText_

As it can be seen from the example, `forc-client` asks for your password to decrypt the `forc-wallet` vault, and list your accounts so that you can select the one you want to fund the transaction with.

## _Icon Link_ [Option 2: Using default signer](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#option-2-using-default-signer)

If you are not interacting with a deployed network, such as testnets, your local `fuel-core` environment can be structured such that it funds an account by default. Using `--default-signer` flag with `forc-client` binaries (run, deploy) will instruct `forc-client` to sign transactions with this pre-funded account. This makes it a useful command while working against a local node.

Example:

```fuel_Box fuel_Box-idXKMmm-css
> forc deploy --default-signer

    Building /Users/test/test-projects/test-contract
    Finished release [optimized + fuel] target(s) in 11.40s
  Confirming transactions [deploy impl-contract]
             Network: http://127.0.0.1:4000
    Finished deploying impl-contract 0xf9fb08ef18ce226954270d6d4f67677d484b8782a5892b3d436572b405407544
    Deployed in block 00000001
```

_Icon ClipboardText_

## _Icon Link_ [Option 3: Manually signing through forc-wallet (Deprecated)](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#option-3-manually-signing-through-forc-wallet-deprecated)

This option is for creating the transaction first, signing it manually, and supplying the signed transaction back to forc-client. Since it requires multiple steps, it is more error-prone and not recommended for general use cases. Also this will be deprecated soon.

1. Construct the transaction by using either `forc deploy` or `forc run`. To do so simply run `forc deploy --manual-sign` or `forc run --manual-sign` with your desired parameters. For a list of parameters please refer to the [forc-deploy](https://docs.fuel.network/docs/nightly/forc/plugins/forc_deploy/) or [forc-run](https://docs.fuel.network/docs/nightly/forc/plugins/forc_run/) section of the book. Once you run either command you will be asked the address of the wallet you are going to be signing with. After the address is given the transaction will be generated and you will be given a transaction ID. At this point CLI will actively wait for you to insert the signature.
2. Take the transaction ID generated in the first step and sign it with `forc wallet sign --account <account_index> tx-id <transaction_id>`. This will generate a signature.
3. Take the signature generated in the second step and provide it to `forc-deploy` (or `forc-run`). Once the signature is provided, the signed transaction will be submitted.

## _Icon Link_ [Other useful commands of `forc-wallet`](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#other-useful-commands-of-forc-wallet)

- You can see a list of existing accounts with `accounts` command.

```fuel_Box fuel_Box-idXKMmm-css
forc wallet accounts
```

_Icon ClipboardText_

- If you want to retrieve the address for an account by its index you can use `account` command.

```fuel_Box fuel_Box-idXKMmm-css
forc wallet account <account_index>
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> If you want to sign the transaction generated by `forc-deploy` or `forc-run` with an account funded by default once you start your local node, you can pass `--default-signer` to them. Please note that this will only work against your local node.
>
> ```fuel_Box fuel_Box-idXKMmm-css
> forc-deploy --default-signer
> ```
>
> _Icon ClipboardText_
>
> ```fuel_Box fuel_Box-idXKMmm-css
> forc-run --default-signer
> ```
>
> _Icon ClipboardText_

By default `--default-signer` flag would sign your transactions with the following private-key:

```fuel_Box fuel_Box-idXKMmm-css
0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c
```

_Icon ClipboardText_

## _Icon Link_ [Selecting a target network](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#selecting-a-target-network)

By default, `local` is used for the target network. To interact with the latest testnet, use the `--testnet` flag. When this flag is passed, transactions created by `forc-deploy` will be sent to the latest `testnet`:

```fuel_Box fuel_Box-idXKMmm-css
forc-deploy --testnet
```

_Icon ClipboardText_

The same can be done to target mainnet:

```fuel_Box fuel_Box-idXKMmm-css
forc-deploy --mainnet
```

_Icon ClipboardText_

It is also possible to pass the exact node URL while using `forc-deploy` or `forc-run` which can be done using `--node-url` flag:

```fuel_Box fuel_Box-idXKMmm-css
forc-deploy --node-url https://mainnet.fuel.network
```

_Icon ClipboardText_

Another alternative is the `--target` option, which provides useful aliases to all targets. For example if you want to deploy to `testnet` you can use:

```fuel_Box fuel_Box-idXKMmm-css
forc-deploy --target testnet
```

_Icon ClipboardText_

Since deploying and running projects on the testnet cost gas, you will need coins to pay for them. You can get some using the [testnet faucet _Icon Link_](https://faucet-testnet.fuel.network/).

## _Icon Link_ [Delayed transactions](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#delayed-transactions)

For delayed transactions, you can use the `--submit-only` flag. This flag allows you to submit the transaction without waiting for its finalization.

One use case for this is multisig transactions, where a deployment transaction may stay in a pending state while waiting for all signatures.

```fuel_Box fuel_Box-idXKMmm-css
forc-deploy --submit-only
```

_Icon ClipboardText_

## _Icon Link_ [Deployment Artifacts](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#deployment-artifacts)

forc-deploy saves the details of each deployment in the `out/deployments` folder within the project's root directory. Below is an example of a deployment artifact:

```fuel_Box fuel_Box-idXKMmm-css
{
  "transaction_id": "0xec27bb7a4c8a3b8af98070666cf4e6ea22ca4b9950a0862334a1830520012f5d",
  "salt": "0x9e35d1d5ef5724f29e649a3465033f5397d3ebb973c40a1d76bb35c253f0dec7",
  "network_endpoint": "http://127.0.0.1:4000",
  "chain_id": 0,
  "contract_id": "0x767eeaa7af2621e637f9785552620e175d4422b17d4cf0d76335c38808608a7b",
  "deployment_size": 68,
  "deployed_block_id": "0x915c6f372252be6bc54bd70df6362dae9bf750ba652bf5582d9b31c7023ca6cf"
}
```

_Icon ClipboardText_

## _Icon Link_ [Proxy Contracts](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#proxy-contracts)

`forc-deploy` supports deploying proxy contracts automatically if it is enabled in the `Forc.toml` of the contract.

```fuel_Box fuel_Box-idXKMmm-css
[project]
name = "test_contract"
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "main.sw"
license = "Apache-2.0"
implicit-std = false

[proxy]
enabled = true
```

_Icon ClipboardText_

If there is no `address` field present under the proxy table, like the example above, `forc` will automatically create a proxy contract based on the [SRC-14](https://docs.fuel.network/docs/nightly/sway-standards/src-14-simple-upgradeable-proxies/) implementation from [sway-standards _Icon Link_](https://github.com/FuelLabs/sway-standards). After generating and deploying the proxy contract, the target is set to the current contract, and the owner of the proxy is set to the account that is signing the transaction for deployment.

This means that if you simply enable proxy in the `Forc.toml`, forc will automatically deploy a proxy contract for you and you do not need to do anything manually aside from signing the deployment transactions for the proxy contract. After deploying the proxy contract, the address is added into the `address` field of the proxy table.

If you want to update the target of an [SRC-14](https://docs.fuel.network/docs/nightly/sway-standards/src-14-simple-upgradeable-proxies/) compliant proxy contract rather than deploying a new one, simply add its `address` in the `address` field, like the following example:

```fuel_Box fuel_Box-idXKMmm-css
[project]
name = "test_contract"
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "main.sw"
license = "Apache-2.0"
implicit-std = false

[proxy]
enabled = true
address = "0xd8c4b07a0d1be57b228f4c18ba7bca0c8655eb6e9d695f14080f2cf4fc7cd946" # example proxy contract address
```

_Icon ClipboardText_

If an `address` is present, `forc` calls into that contract to update its `target` instead of deploying a new contract. Since a new proxy deployment adds its own `address` into the `Forc.toml` automatically, you can simply enable the proxy once and after the initial deployment, `forc` will keep updating the target accordingly for each new deployment of the same contract.

## _Icon Link_ [Large Contracts](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#large-contracts)

For contracts over the maximum contract size limit (currently `100kB`) defined by the network, `forc-deploy` will split the contract into chunks and deploy the contract with multiple transactions using the Rust SDK's [loader contract _Icon Link_](https://github.com/FuelLabs/fuels-rs/blob/v0.71.0/docs/src/deploying/large_contracts.md) functionality. Chunks that have already been deployed will be reused on subsequent deployments.

## _Icon Link_ [Deploying Scripts and Predicates](https://docs.fuel.network/docs/nightly/forc/plugins/forc_client/\#deploying-scripts-and-predicates)

`forc deploy` now supports deploying scripts and predicates in addition to contracts. These are deployed as blobs with generated loaders for efficiency.

Scripts and predicates are deployed automatically when you run `forc deploy` on a project that contains them. The deployment process differs slightly from contract deployment:

1. For scripts and predicates, the bytecode is uploaded as a blob.
2. A loader is generated that can load and execute the blob.
3. The loader bytecode is saved in the project's output directory.

After deployment, you'll find new files in your project's output directory:

- For scripts: `<script_name>-loader.bin`
- For predicates: `<predicate_name>-loader.bin` and `<predicate_name>-loader-root`

The loader files contain the bytecode necessary to load and execute your script or predicate from the deployed blob.

This new deployment method allows for more efficient storage and execution of scripts and predicates on the Fuel network.

Note: Contracts are still deployed directly, not as blobs given that the contract size is under the maximum contract size limit defined by network (currently `100kB`).