[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

Creating a Fuel Dapp

## _Icon Link_ [Creating a Fuel dApp](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#creating-a-fuel-dapp)

`npm create fuels` is a command line tool that helps you scaffold a new full-stack Fuel dApp. In this guide, we will create a new counter dApp using `npm create fuels` and add decrement functionality to it. The final result will look like this:

![End result of this guide](https://docs.fuel.network/api/image/creating-a-fuel-dapp-create-fuels-end-result)

You can also check it live, deployed to the Testnet:

- [https://create-fuels-template.vercel.app/ _Icon Link_](https://create-fuels-template.vercel.app/)

## _Icon Link_ [Initializing the project](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#initializing-the-project)

The first step is to run the command:

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm create fuels@0.100.1
```

_Icon ClipboardText_

Once you run the command, you will be asked to choose a name for your project:

```fuel_Box fuel_Box-idXKMmm-css
◇ What is the name of your project?
│ my-fuel-project
└
```

_Icon ClipboardText_

The tool will scaffold the project and install the necessary dependencies for you. You will then be greeted with this message:

```fuel_Box fuel_Box-idXKMmm-css
⚡️ Success! Created a fullstack Fuel dapp at my-fuel-project

To get started:

- cd into the project directory: cd my-fuel-project
- Start a local Fuel dev server: pnpm fuels:dev
- Run the frontend: pnpm dev

-> TS SDK docs: https://docs.fuel.network/docs/fuels-ts/
-> Sway docs: https://docs.fuel.network/docs/sway/
-> If you have any questions, check the Fuel forum: https://forum.fuel.network/
```

_Icon ClipboardText_

## _Icon Link_ [Directory Structure](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#directory-structure)

The project scaffolded by `npm create fuels` has roughly the following directory structure:

```fuel_Box fuel_Box-idXKMmm-css
my-fuel-project
├── src
│ ├── components
│ │ └── ...
│ ├── hooks
│ │ └── ...
│ ├── lib.tsx
│ ├── App.tsx
│ └── ...
├── sway-programs
│ ├── contract
│ │ └── ...
│ └── ...
├── public
│ └── ...
├── fuels.config.ts
├── package.json
└── ...
```

_Icon ClipboardText_

It is a Vite project with a few extra files and folders. Let's take a closer look at some of the important ones:

## _Icon Link_ [`./fuels.config.ts`](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#fuelsconfigts)

This is the configuration file for the [`fuels` CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/), the CLI and tooling that powers this project under the hood. It makes sure that all of your Sway programs are continuously compiled and deployed to your local Fuel node. You can read more about the `fuels.config.ts` file in the [Fuels CLI documentation](https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/).

## _Icon Link_ [`./sway-programs/contract/src/main.sw`](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#sway-programscontractsrcmainsw)

This is where our Sway contract lives. Out of the box, it is a simple counter contract that can only be incremented. We will add a decrement functionality to it in the next step.

## _Icon Link_ [`./src/App.tsx`](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#srcapptsx)

This file contains the source code for the frontend of our dApp.

## _Icon Link_ [`./src/components/Contract.tsx`](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#srccomponentscontracttsx)

This file contains the source code for the 'Contract' tab in the UI, this is where the contract calling logic is implemented.

## _Icon Link_ [Dev Environment Setup](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#dev-environment-setup)

Now that we have our project scaffolded, let's set up our development environment.

Let's first start our Fuel Dev server. This will start a local Fuel node and continuously compile and deploy our Sway programs to it.

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels:dev
```

_Icon ClipboardText_

Once the server is up and running, we can start our Next.js development server in another terminal.

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm dev
```

_Icon ClipboardText_

You should now be able to see the dApp running at `http://localhost:5173`. Go ahead and connect a wallet to the dApp. You can choose the Burner Wallet from the list if you don't want to connect a wallet.

![Available Wallet Connectors](https://docs.fuel.network/api/image/creating-a-fuel-dapp-wallet-list)

Now, you can try changing the contents of the `./sway-programs/contract/src/main.sw` file and see the changes reflected in the 'Contract' tab in the UI without having to restart the server.

![Fullstack Fuel Dev Workflow](https://docs.fuel.network/api/image/creating-a-fuel-dapp-create-fuels-split-view)

**Note:** You may wish to learn more about how you could create a Fuel dApp that uses predicates, check out our [Working with Predicates](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/working-with-predicates/) guide.

## _Icon Link_ [Adding Decrement Functionality](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#adding-decrement-functionality)

To add decrement functionality to our counter, we will have to do two things: 1. Add a `decrement_counter` function to our Sway contract, and 2. Modify the `./src/components/Contract.tsx` file to add a button that calls this function.

## _Icon Link_ [1\. Modifying the Sway Contract](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#1-modifying-the-sway-contract)

To add a `decrement_counter` function to our Sway contract, we will modify the `./sway-programs/contract/src/main.sw` file.

There are two steps when adding a new function to a Sway program. The first step is to specify the function's ABI.

Towards the top of the file, you will find the ABI section for the contract. Let's add a new function to it:

```fuel_Box fuel_Box-idXKMmm-css
// The abi defines the blueprint for the contract.
abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64;

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64;
}
```

_Icon ClipboardText_

The second step is to implement the function.

We will add the implementation of the `decrement_counter` function right below the `increment_counter` function.

```fuel_Box fuel_Box-idXKMmm-css
impl Counter for Contract {
    // The `get_count` function returns the current value of the counter.
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.read()
    }

    // The `increment_counter` function increments the counter by the given amount.
    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current + amount);
        storage.counter.read()
    }

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current - amount);
        storage.counter.read()
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [2\. Modifying the Frontend](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#2-modifying-the-frontend)

We will now add a new button to the frontend that will call the `decrement_counter` function when clicked. To do this, we will modify the `./src/App.tsx` file.

First, we will add a function called `decrementCounter` similar to the `incrementCounter` function:

```fuel_Box fuel_Box-idXKMmm-css
  async function decrementCounter() {
    if (!wallet || !contract) return;
    setIsLoading(true);

    try {
      const call = await contract.functions.decrement_counter(1).call();
      transactionSubmitNotification(call.transactionId);
      const result = await call.waitForResult();
      transactionSuccessNotification(result.transactionId);
      setCounter(result.value.toNumber());
    } catch (error) {
      console.error(error);
      errorNotification("Error decrementing counter");
    }
    setIsLoading(false);
  }
```

_Icon ClipboardText_

Second, we will add a new button to the UI that will call the `decrementCounter` function when clicked:

```fuel_Box fuel_Box-idXKMmm-css
<Button onClick={onDecrementPressed} className="mt-6">
  Decrement Counter
</Button>
```

_Icon ClipboardText_

Congratulations! You should now be able to see the counter dApp running at `http://localhost:5173` with our newly added decrement functionality.

You can find the complete source code of the dApp we built [here _Icon Link_](https://github.com/FuelLabs/fuels-ts/tree/v0.100.1/apps/create-fuels-counter-guide).

![End result of this guide](https://docs.fuel.network/api/image/creating-a-fuel-dapp-create-fuels-end-result)

Whenever you want to add a new feature to your dApp and quickly prototype things, you can follow the same steps we followed in this guide.

## _Icon Link_ [3\. Extending the contract testing suite (Optional)](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#3-extending-the-contract-testing-suite-optional)

Testing our smart contract is a good practice to ensure that our implementation is working as expected. It also give assurances down the line if we decide to change the implementation of our contract.

We write our test in the `#[test]` macro within our Sway contract, these can be inline within our Sway contract or in a separate file.

For the guide, we'll add a test for our new `decrement_counter` function in the `./sway-programs/contract/src/main.sw` file:

```fuel_Box fuel_Box-idXKMmm-css
#[test]
fn test_decrement_counter() {
    let contract_instance = abi(Counter, CONTRACT_ID);
    let _ = contract_instance.increment_counter(5);

    let count_before = contract_instance.get_count();
    let count_after = contract_instance.decrement_counter(1);
    assert(count_after == count_before - 1);
}
```

_Icon ClipboardText_

After writing our test, we can run either using `forc test` or via PNPM using `pnpm test:forc`.

## _Icon Link_ [4\. Extending the integration test suite (Optional)](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#4-extending-the-integration-test-suite-optional)

Testing the integration with your smart contract isn't essential, but it's good practice to ensure that your application is working as expected. It also gives you the ability to test your application in a controlled environment against a local node.

We've provided some examples for each program type in the `./test` directory of your project. But let's also add a test for our new `decrement_counter` function in the `./test/contract.test.ts` file:

```fuel_Box fuel_Box-idXKMmm-css
import { Wallet, Provider } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CounterFactory } from '../../../typegend/contracts';

// Let's create our provider from the network URL.
const provider = new Provider(LOCAL_NETWORK_URL);
// Let's create our wallet from the private key.
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// Then we can deploy the contract.
const { waitForResult } = await CounterFactory.deploy(wallet);
const { contract } = await waitForResult();

// Lets setup some values to use in our example.
const initialCount = 0;
const incrementedValue = 5;
const decrementedValue = 2;

// We can now call the contract functions and test the results. Lets assert the initial value of the counter.
const { waitForResult: getCountWaitForResult } = await contract.functions
  .get_count()
  .call();
const { value: initialGetCountValue } = await getCountWaitForResult();

console.log('Initial value', initialGetCountValue);

// Next we'll increment the counter, so that we can decrement it.
const { waitForResult: incWaitForResult } = await contract.functions
  .increment_count(5)
  .call();
const { value: incValue } = await incWaitForResult();

console.log('Incremented value', incValue);

// Next, we'll decrement the counter by 3 and assert the new value.
const { waitForResult: decWaitForResult } = await contract.functions
  .decrement_count(3)
  .call();
const { value: decValue } = await decWaitForResult();

console.log('Decremented value', decValue);

// Finally, we'll test the get count function again to ensure parity.
const { waitForResult: finalWaitForResult } = await contract.functions
  .get_count()
  .call();
const { value: finalValue } = await finalWaitForResult();

console.log('Final value', finalValue);
```

Collapse_Icon ClipboardText_

The template also comes with a UI testing setup using [Playwright _Icon Link_](https://playwright.dev/). We can add a test for our new `decrement_counter` function in the `./test/ui/ui.test.ts` file:

```fuel_Box fuel_Box-idXKMmm-css
test('counter contract - decrement function call works properly', async ({ page }) => {
  await setup({ page });

  const topUpWalletButton = page.getByText('Transfer 5 ETH', { exact: true });
  await topUpWalletButton.click();

  await page.waitForTimeout(2000); // These timeouts are needed to ensure that we wait for transactions to be mined

  const contractTab = page.getByText('Contract');
  await contractTab.click();

  const initialCounterValue = +page.getByTestId('counter').textContent;

  const decrementButton = page.getByText('Decrement', { exact: true });
  await decrementButton.click();

  const counterValueAfterDecrement = +page.getByTestId('counter').textContent;
  expect(counterValueAfterDecrement).toEqual(initialCounterValue - 1);
});
```

_Icon ClipboardText_

## _Icon Link_ [Next Steps](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/\#next-steps)

- Now that you have a basic counter dApp running and have the `npm create fuels` workflow powering you, you can start building more complex dApps using the Fuel Stack. A good place to start for ideas and reference code is the [Sway Applications Repo _Icon Link_](https://github.com/FuelLabs/sway-applications).

- As you may have noticed, there are different types of programs in your dApp, feel free to explore [Predicates _Icon Link_](https://docs.fuel.network/docs/fuels-ts/predicates/) and [Scripts _Icon Link_](https://docs.fuel.network/docs/fuels-ts/scripts/), which are both important differentiators in the Fuel Stack.

- If you want to deploy your dApp to the testnet, check out our [Deploying a dApp to Testnet](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/deploying-a-dapp-to-testnet/) guide.

- If you want to further validate the functionality of your dApp and program types, check out the `test` directory in your `create fuels` project. Couple this with our [testing guide _Icon Link_](https://docs.fuel.network/docs/fuels-ts/testing/) to get a better understanding of how to test your dApp.

- If you have any questions or need help, feel free to reach out to us on the [Official Fuel Forum _Icon Link_](https://forum.fuel.network/).

- If you want to learn more about the Fuel Stack, check out the [Fuel Docs _Icon Link_](https://docs.fuel.network/).