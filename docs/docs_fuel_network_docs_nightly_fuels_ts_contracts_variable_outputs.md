[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Variable Outputs

## _Icon Link_ [Variable Outputs](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/variable-outputs/\#variable-outputs)

Sway includes robust functions for transferring assets to wallets and contracts.

When using these transfer functions within your Sway projects, it is important to be aware that each call will require an [Output Variable _Icon Link_](https://docs.fuel.network/docs/specs/tx-format/output#outputvariable) within the [Outputs _Icon Link_](https://docs.fuel.network/docs/specs/tx-format/output) of the transaction.

For instance, if a contract function calls a Sway transfer function 3 times, it will require 3 Output Variables present within the list of outputs in your transaction.

## _Icon Link_ [Example: Sway functions that requires `Output Variable`](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/variable-outputs/\#example-sway-functions-that-requires-output-variable)

```fuel_Box fuel_Box-idXKMmm-css
fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64) {
    transfer(Identity::Address(recipient), asset_id, amount);
}

fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64) {
    transfer(Identity::ContractId(target), asset_id, amount);
}
```

_Icon ClipboardText_

## _Icon Link_ [Adding Variable Outputs to the contract call](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/variable-outputs/\#adding-variable-outputs-to-the-contract-call)

When your contract invokes any of these functions, or if it calls a function that leads to another contract invoking these functions, you need to add the appropriate number of Output Variables.

This can be done as shown in the following example:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet, getMintedAssetId, getRandomB256 } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { TokenFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await TokenFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

const subId = getRandomB256();

const call1 = await contract.functions.mint_coins(subId, 100).call();
await call1.waitForResult();

const address = { bits: Wallet.generate().address.toB256() };
const assetId = { bits: getMintedAssetId(contract.id.toB256(), subId) };

const { waitForResult } = await contract.functions
  .transfer_to_address(address, assetId, 100)
  .txParams({
    variableOutputs: 1,
  })
  .call();

await waitForResult();
```

_Icon ClipboardText_

In the TypeScript SDK, the Output Variables are automatically added to the transaction's list of outputs.

This process is done by a brute-force strategy, performing sequential dry runs until no errors are returned. This method identifies the number of Output Variables required to process the transaction.

However, this can significantly delay the transaction processing. Therefore, it is **highly recommended** to manually add the correct number of Output Variables before submitting the transaction.