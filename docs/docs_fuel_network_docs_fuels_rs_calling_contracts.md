[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

Calling Contracts

## _Icon Link_ [Calling contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/\#calling-contracts)

Once you've deployed your contract, as seen in the previous sections, you'll likely want to:

1. Call contract methods;
2. Configure call parameters and transaction policies;
3. Forward coins and gas in your contract calls;
4. Read and interpret returned values and logs.

Here's an example. Suppose your Sway contract has two ABI methods called `initialize_counter(u64)` and `increment_counter(u64)`. Once you've deployed it the contract, you can call these methods like this:

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

The example above uses all the default configurations and performs a simple contract call.

Furthermore, if you need to separate submission from value retrieval for any reason, you can do so as follows:

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_instance
    .methods()
    .initialize_counter(42)
    .submit()
    .await?;

tokio::time::sleep(Duration::from_millis(500)).await;
let value = response.response().await?.value;

```

_Icon ClipboardText_

Next, we'll see how we can further configure the many different parameters in a contract call.