[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Blockchain Development](https://docs.fuel.network/docs/nightly/sway/blockchain-development/) /

External Code

## _Icon Link_ [External Code Execution](https://docs.fuel.network/docs/nightly/sway/blockchain-development/external_code/\#external-code-execution)

The `std-lib` includes a function called `run_external` that allows Sway contracts to execute arbitrary external Sway code.

This functionality enables features like upgradeable contracts and
proxies.

## _Icon Link_ [Upgradeable Contracts](https://docs.fuel.network/docs/nightly/sway/blockchain-development/external_code/\#upgradeable-contracts)

Upgradeable contracts are designed to allow the logic of a smart contract to be updated after deployment.

Consider this example proxy contract:

```fuel_Box fuel_Box-idXKMmm-css
#[namespace(my_storage_namespace)]
storage {
    target_contract: Option<ContractId> = None,
}

impl Proxy for Contract {
    #[storage(write)]
    fn set_target_contract(id: ContractId) {
        storage.target_contract.write(Some(id));
    }

    #[storage(read)]
    fn double_input(_value: u64) -> u64 {
        let target = storage.target_contract.read().unwrap();
        run_external(target)
    }
}
```

_Icon ClipboardText_

The contract has two functions:

- `set_target_contract` updates the `target_contract` variable in storage with the `ContractId` of an external contract.
- `double_input` reads the `target_contract` from storage and uses it to run external code. If the `target_contract` has a function with the same name ( `double_input`), the code in the external `double_input` function will run.
In this case, the function will return a `u64`.

Notice in the `Proxy` example above, the storage block has a `namespace` attribute. Using this attribute is considered a best practice for all proxy contracts in Sway, because it will prevent storage collisions with the implementation contract, as the implementation contract has access to both storage contexts.

Below is what an implementation contract could look like for this:

```fuel_Box fuel_Box-idXKMmm-css
storage {
    value: u64 = 0,
    // to stay compatible, this has to stay the same in the next version
}

impl Implementation for Contract {
    #[storage(write)]
    fn double_input(value: u64) -> u64 {
        let new_value = value * 2;
        storage.value.write(new_value);
        new_value
    }
}
```

_Icon ClipboardText_

This contract has one function called `double_input`, which calculates the input value times two, updates the `value` variable in storage, and returns the new value.

## _Icon Link_ [How does this differ from calling a contract?](https://docs.fuel.network/docs/nightly/sway/blockchain-development/external_code/\#how-does-this-differ-from-calling-a-contract)

There are a couple of major differences between calling a contract directly and using the `run_external` method.

First, to use `run_external`, the ABI of the external contract is not required. The proxy contract has no knowledge of the external contract except for its `ContractId`.

## _Icon Link_ [Upgradeable Contract Storage](https://docs.fuel.network/docs/nightly/sway/blockchain-development/external_code/\#upgradeable-contract-storage)

Second, the storage context of the proxy contract is retained for the loaded code.
This means that in the examples above, the `value` variable gets updated in the storage for the _proxy_ contract.

For example, if you were to read the `value` variable by directly calling the implementation contract, you would get a different result than if you read it through the proxy contract.
The proxy contract loads the code and executes it in its own context.

## _Icon Link_ [Fallback functions](https://docs.fuel.network/docs/nightly/sway/blockchain-development/external_code/\#fallback-functions)

If the function name doesn't exist in the target contract but a `fallback` function does, the `fallback` function will be triggered.

> _Icon InfoCircle_
>
> If there is no fallback function, the transaction will revert.

You can access function parameters for fallback functions using the `call_frames` module in the `std-lib`.
For example, to access the `_foo` input parameter in the proxy function below, you can use the `called_args` method in the `fallback` function:

```fuel_Box fuel_Box-idXKMmm-css
fn does_not_exist_in_the_target(_foo: u64) -> u64 {
    run_external(TARGET)
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
#[fallback]
fn fallback() -> u64 {
    use std::call_frames::*;
    __log(3);
    __log(called_method());
    __log("double_value");
    __log(called_method() == "double_value");
    let foo = called_args::<u64>();
    foo * 3
}
```

_Icon ClipboardText_

In this case, the `does_not_exist_in_the_target` function will return `_foo * 3`.

## _Icon Link_ [Limitations](https://docs.fuel.network/docs/nightly/sway/blockchain-development/external_code/\#limitations)

Some limitations of `run_external` function are:

- It can only be used with other contracts. Scripts, predicates, and library code cannot be run externally.
- If you change the implementation contract, you must maintain the same order of previous storage variables and types, as this is what has been stored in the proxy storage.
- You can't use the call stack in another call frame before you use `run_external`. You can only use the call stack within the call frame that contains `run_external`.