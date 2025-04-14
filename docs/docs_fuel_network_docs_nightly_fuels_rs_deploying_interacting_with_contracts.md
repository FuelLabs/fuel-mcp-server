[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Deploying](https://docs.fuel.network/docs/nightly/fuels-rs/deploying/) /

Interacting With Contracts

## _Icon Link_ [Interacting with contracts](https://docs.fuel.network/docs/nightly/fuels-rs/deploying/interacting-with-contracts/\#interacting-with-contracts)

If you already have a deployed contract and want to call its methods using the SDK, but without deploying it again, all you need is the contract ID of your deployed contract. You can skip the whole deployment setup and call `::new(contract_id, wallet)` directly. For example:

```fuel_Box fuel_Box-idXKMmm-css
abigen!(Contract(
    name = "MyContract",
    // Replace with your contract ABI.json path
    abi = "e2e/sway/contracts/contract_test/out/release/contract_test-abi.json"
));
let wallet_original = launch_provider_and_get_wallet().await?;

let wallet = wallet_original.clone();
// Your bech32m encoded contract ID.
let contract_id: Bech32ContractId =
    "fuel1vkm285ypjesypw7vhdlhnty3kjxxx4efckdycqh3ttna4xvmxtfs6murwy".parse()?;

let connected_contract_instance = MyContract::new(contract_id, wallet);
// You can now use the `connected_contract_instance` just as you did above!
```

_Icon ClipboardText_

The above example assumes that your contract ID string is encoded in the `bech32` format. You can recognize it by the human-readable-part "fuel" followed by the separator "1". However, when using other Fuel tools, you might end up with a hex-encoded contract ID string. In that case, you can create your contract instance as follows:

```fuel_Box fuel_Box-idXKMmm-css
let contract_id: ContractId =
    "0x65b6a3d081966040bbccbb7f79ac91b48c635729c59a4c02f15ae7da999b32d3".parse()?;

let connected_contract_instance = MyContract::new(contract_id, wallet);
```

_Icon ClipboardText_

You can learn more about the Fuel SDK `bech32` types [here](https://docs.fuel.network/docs/nightly/fuels-rs/types/bech32/).