[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Creating a Fuel Dapp](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/) /

Working With Predicates

## _Icon Link_ [Working with Predicates](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/working-with-predicates/\#working-with-predicates)

This guide builds on the [Creating a Fuel dApp](https://docs.fuel.network/docs/fuels-ts/) guide. Once you've gotten the dApp there up and running, then you can continue here via clicking the Predicate Example link. We will modify the predicate we created in the previous guide. The final result will look like this:

![End result of this guide](https://docs.fuel.network/api/image/working-with-predicates-end-result)

You can also check it live, deployed to the Testnet:

- [https://create-fuels-template.vercel.app/ _Icon Link_](https://create-fuels-template.vercel.app/)

## _Icon Link_ [Adding a Configurable pin](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/working-with-predicates/\#adding-a-configurable-pin)

The current predicate functionality we have is a simple one that checks if the user has a pin. We will modify this predicate to accept a configurable pin. This will allow the user to set their own pin.

1. Modifying the Predicate Contract

The first step is to modify the predicate contract to accept a configurable pin. We will use the [`configurable` _Icon Link_](https://docs.fuel.network/guides/intro-to-predicates/configurables/#configurables) keyword to create an updatable constant to store the pin. We will also modify the main function to check this constant instead of a hardcoded pin.

```fuel_Box fuel_Box-idXKMmm-css
predicate;

configurable {
    PIN: u64 = 1337,
}

fn main(pin: u64) -> bool {
    return PIN == pin;
}

```

_Icon ClipboardText_

2. Modifying the Frontend

We will now add new button to the frontend that will update the `pin` in the predicate when clicked. To do this, we will modify the `./src/components/Predicate.tsx` file.

We will add a function called `changePin`, which will use the current pin in state to update the pin in the predicate as well as transfer 1000 to the predicate.

```fuel_Box fuel_Box-idXKMmm-css
  const changePin = async () => {
    if (!wallet || !predicate) return;
    setIsLoading(true);

    try {
      const configurableConstants = { PIN: bn(predicatePin) };
      const newPredicate = new TestPredicate({
        provider: wallet.provider,
        data: [configurableConstants.PIN],
        configurableConstants,
      });

      const tx = await wallet.transfer(newPredicate.address, bn(2_000_000));
      transactionSubmitNotification(tx.id);
      await tx.waitForResult();
      transactionSuccessNotification(tx.id);
    } catch (error) {
      console.error(error);
      errorNotification(
        "Error changing pin.",
      );
    }
    setIsLoading(false);
    refetch();
  };
```

_Icon ClipboardText_

It would also be useful to change the placeholder text.

```fuel_Box fuel_Box-idXKMmm-css
<input
  type="text"
  value={predicatePin}
  onChange={(e) => setPredicatePin(e.target.value)}
  className="w-1/2 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
  placeholder="Enter current or new pin"
/>
```

_Icon ClipboardText_

Finally, we will add a button that calls the `changePin` function when clicked.

```fuel_Box fuel_Box-idXKMmm-css
<Button onClick={changePin} className="w-full" disabled={isLoading}>
  Change Pin
</Button>
```

_Icon ClipboardText_

Congratulations! That's all. You should now be able to see the modified predicate dApp running at `http://localhost:5173` with our newly added change pin functionality.

You can find the complete source code of the dApp we built [here _Icon Link_](https://github.com/FuelLabs/fuels-ts/tree/v0.100.1/apps/create-fuels-counter-guide).

## _Icon Link_ [Next Steps](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/working-with-predicates/\#next-steps)

- Now that you have a predicate dApp running and have the `npm create fuels` workflow powering you, you can start building more complex dApps using the Fuel Stack. A good place to start for ideas and reference code is the [Sway Applications Repo _Icon Link_](https://github.com/FuelLabs/sway-applications).

- If you have any questions or need help, feel free to reach out to us on the [Official Fuel Forum _Icon Link_](https://forum.fuel.network/).

- If you want to learn more about the Fuel Stack, check out the [Fuel Docs _Icon Link_](https://docs.fuel.network/).