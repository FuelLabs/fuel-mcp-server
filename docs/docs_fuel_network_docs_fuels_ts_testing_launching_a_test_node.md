[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Testing](https://docs.fuel.network/docs/fuels-ts/testing/) /

Launching a Test Node

## _Icon Link_ [Launching a Test Node](https://docs.fuel.network/docs/fuels-ts/testing/launching-a-test-node/\#launching-a-test-node)

To simplify testing in isolation, we provide a utility called `launchTestNode`.

It allows you to spin up a short-lived `fuel-core` node, set up a custom provider, wallets, deploy contracts, and much more in one go.

For usage information for `launchTestNode` including it's inputs, outputs and options, please check the [API reference _Icon Link_](https://fuels-ts-docs-api.vercel.app/functions/_fuel_ts_contract.test_utils.launchTestNode.html).

## _Icon Link_ [Explicit Resource Management](https://docs.fuel.network/docs/fuels-ts/testing/launching-a-test-node/\#explicit-resource-management)

We support [explicit resource management _Icon Link_](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations), introduced in TypeScript 5.2, which automatically calls a `cleanup` function after a variable instantiated with the `using` keyword goes out of block scope:

```fuel_Box fuel_Box-idXKMmm-css
using launched = await launchTestNode();

/*
 * The method `launched.cleanup()` will be automatically
 * called when the variable `launched` goes out of block scope.
 */

```

_Icon ClipboardText_

## _Icon Link_ [Configuring Typescript](https://docs.fuel.network/docs/fuels-ts/testing/launching-a-test-node/\#configuring-typescript)

To use [explicit resource management _Icon Link_](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations), you must:

1. Set your TypeScript version to `5.2` or above
2. Set the compilation target to `es2022` or below
3. Configure your lib setting to either include `esnext` or `esnext.disposable`

```fuel_Box fuel_Box-idXKMmm-css
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "esnext.disposable"]
  }
}
```

_Icon ClipboardText_

## _Icon Link_ [Standard API](https://docs.fuel.network/docs/fuels-ts/testing/launching-a-test-node/\#standard-api)

If you don't want, or can't use [explicit resource management _Icon Link_](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations), you can use `const` as usual.

In this case, remember you must call `.cleanup()` to dispose of the node.

```fuel_Box fuel_Box-idXKMmm-css
const launchedTestNode = await launchTestNode();

/*
  Do your things, run your tests, and then call
  `launchedTestNode.cleanup()` to dispose of everything.
*/

launchedTestNode.cleanup();
```

_Icon ClipboardText_