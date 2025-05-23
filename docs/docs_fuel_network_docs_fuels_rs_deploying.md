[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

Deploying

## _Icon Link_ [Deploying contracts](https://docs.fuel.network/docs/fuels-rs/deploying/\#deploying-contracts)

There are two main ways of working with contracts in the SDK: deploying a contract with SDK or using the SDK to interact with existing contracts.

## _Icon Link_ [Deploying a contract binary](https://docs.fuel.network/docs/fuels-rs/deploying/\#deploying-a-contract-binary)

Once you've written a contract in Sway and compiled it with `forc build`, you'll have in your hands two important artifacts: the compiled binary file and the JSON ABI file.

> _Icon InfoCircle_
>
> Note: Read [here _Icon Link_](https://docs.fuel.network/guides/quickstart/) for more on how to work with Sway.

Below is how you can deploy your contracts using the SDK. For more details about each component in this process, read [The abigen macro](https://docs.fuel.network/docs/fuels-rs/abigen/the-abigen-macro/), [The FuelVM binary file](https://docs.fuel.network/docs/fuels-rs/deploying/the-fuelvm-binary-file/), and [The JSON ABI file](https://docs.fuel.network/docs/fuels-rs/abigen/the-json-abi-file/).

First, the `Contract::load_from` function is used to load a contract binary with a `LoadConfiguration`. If you are only interested in a single instance of your contract, use the default configuration: `LoadConfiguration::default()`. After the contract binary is loaded, you can use the `deploy()` method to deploy the contract to the blockchain.

```fuel_Box fuel_Box-idXKMmm-css
// This helper will launch a local node and provide a test wallet linked to it
let wallet = launch_provider_and_get_wallet().await?;

// This will load and deploy your contract binary to the chain so that its ID can
// be used to initialize the instance
let contract_id = Contract::load_from(
    "../../e2e/sway/contracts/contract_test/out/release/contract_test.bin",
    LoadConfiguration::default(),
)?
.deploy(&wallet, TxPolicies::default())
.await?;

println!("Contract deployed @ {contract_id}");
```

_Icon ClipboardText_

Alternatively, you can use `LoadConfiguration` to configure how the contract is loaded. `LoadConfiguration` let's you:

- Load the same contract binary with `Salt` to get a new `contract_id`
- Change the contract's storage slots
- Update the contract's configurables

> _Icon InfoCircle_
>
> Note: The next section will give more information on how `configurables` can be used.

Additionally, you can set custom `TxParameters` when deploying the loaded contract.

```fuel_Box fuel_Box-idXKMmm-css
// Optional: Add `Salt`
let rng = &mut StdRng::seed_from_u64(2322u64);
let salt: [u8; 32] = rng.gen();

// Optional: Configure storage
let key = Bytes32::from([1u8; 32]);
let value = Bytes32::from([2u8; 32]);
let storage_slot = StorageSlot::new(key, value);
let storage_configuration =
    StorageConfiguration::default().add_slot_overrides([storage_slot]);
let configuration = LoadConfiguration::default()
    .with_storage_configuration(storage_configuration)
    .with_salt(salt);

// Optional: Configure deployment parameters
let tx_policies = TxPolicies::default()
    .with_tip(1)
    .with_script_gas_limit(1_000_000)
    .with_maturity(0);

let contract_id_2 = Contract::load_from(
    "../../e2e/sway/contracts/contract_test/out/release/contract_test.bin",
    configuration,
)?
.deploy(&wallet, tx_policies)
.await?;

println!("Contract deployed @ {contract_id_2}");
```

_Icon ClipboardText_

After the contract is deployed, you can use the contract's methods like this:

```fuel_Box fuel_Box-idXKMmm-css
// This will generate your contract's methods onto `MyContract`.
// This means an instance of `MyContract` will have access to all
// your contract's methods that are running on-chain!
abigen!(Contract(
    name = "MyContract",
    abi = "e2e/sway/contracts/contract_test/out/release/contract_test-abi.json"
));

// This is an instance of your contract which you can use to make calls to your functions
let contract_instance = MyContract::new(contract_id_2, wallet);

let response = contract_instance
    .methods()
    .initialize_counter(42) // Build the ABI call
    .call() // Perform the network call
    .await?;

assert_eq!(42, response.value);

let response = contract_instance
    .methods()
    .increment_counter(10)
    .call()
    .await?;

assert_eq!(52, response.value);
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Note: When redeploying an existing `Contract`, ensure that you initialize it with a unique salt to prevent deployment failures caused by a contract ID collision. To accomplish this, utilize the `with_salt` method to clone the existing `Contract` with a new salt.