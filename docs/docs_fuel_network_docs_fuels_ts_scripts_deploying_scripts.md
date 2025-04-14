[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Scripts](https://docs.fuel.network/docs/fuels-ts/scripts/) /

Deploying Scripts

## _Icon Link_ [Deploying Scripts](https://docs.fuel.network/docs/fuels-ts/scripts/deploying-scripts/\#deploying-scripts)

In order to optimize the cost of your recurring script executions, we recommend first deploying your script. This can be done using the [Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) and running the [deploy command](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy).

By deploying the script, its bytecode is stored on chain as a blob. The SDK will then produce bytecode that can load the blob on demand to execute the original script. This far reduces the repeat execution cost of the script.

## _Icon Link_ [How to Deploy a Script](https://docs.fuel.network/docs/fuels-ts/scripts/deploying-scripts/\#how-to-deploy-a-script)

To deploy a script, we can use the [Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) and execute the [deploy command](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy).

This will perform the following actions:

1. Compile the script using your `forc` version
2. Deploy the built script binary to the chain as a blob
3. Generate a script that loads the blob that can be used to execute the script
4. Generate types for both the script and the loader that you can use in your application

We can then utilize the above generated types like so:

```fuel_Box fuel_Box-idXKMmm-css
const provider = new Provider(providerUrl);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// First, we will need to instantiate the script via it's loader bytecode. This can be imported from the typegen outputs
// that were created on `fuels deploy`
const script = new TypegenScriptLoader(wallet);

// Now we are free to interact with the script as we would normally, such as overriding the configurables
const configurable = {
  AMOUNT: 20,
};
script.setConfigurableConstants(configurable);

const { waitForResult } = await script.functions.main(10).call();
const { value, gasUsed } = await waitForResult();
console.log('value', value);
```

_Icon ClipboardText_