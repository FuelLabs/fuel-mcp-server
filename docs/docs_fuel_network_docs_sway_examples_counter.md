[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Examples](https://docs.fuel.network/docs/sway/examples/) /

Counter

## _Icon Link_ [Counter](https://docs.fuel.network/docs/sway/examples/counter/\#counter)

The following is a simple example of a contract which implements a counter. Both the `initialize_counter()` and `increment_counter()` ABI methods return the currently set value.

```fuel_Box fuel_Box-idXKMmm-css
forc template --template-name counter my_counter_project
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi TestContract {
    #[storage(write)]
    fn initialize_counter(value: u64) -> u64;

    #[storage(read, write)]
    fn increment_counter(amount: u64) -> u64;
}

storage {
    counter: u64 = 0,
}

impl TestContract for Contract {
    #[storage(write)]
    fn initialize_counter(value: u64) -> u64 {
        storage.counter.write(value);
        value
    }

    #[storage(read, write)]
    fn increment_counter(amount: u64) -> u64 {
        let incremented = storage.counter.read() + amount;
        storage.counter.write(incremented);
        incremented
    }
}

```

_Icon ClipboardText_

## _Icon Link_ [Build and deploy](https://docs.fuel.network/docs/sway/examples/counter/\#build-and-deploy)

The following commands can be used to build and deploy the contract. For a detailed tutorial, refer to [Building and Deploying _Icon Link_](https://docs.fuel.network/guides/contract-quickstart/#building-the-contract).

```fuel_Box fuel_Box-idXKMmm-css
# Build the contract
forc build

# Deploy the contract
forc deploy --testnet
```

_Icon ClipboardText_