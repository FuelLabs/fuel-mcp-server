[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Predicate Root

## _Icon Link_ [Predicate Root](https://docs.fuel.network/guides/intro-to-predicates/predicate-root/\#predicate-root)

Let's pause here for a moment and build the predicate at the root of the predicate folder.

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

Unlike building a contract, constructing the predicate generates an additional piece of information: an address that is hashed from the predicate code of your templated project, known as the **predicate root**. Since this process is cryptographic, any changes to the code will result in a change in the predicate root.

Since everyone is starting with the exact same templated code, the predicate root should be exactly this:

```fuel_Box fuel_Box-idXKMmm-css
0x68fec7a57e48f4ec6467d7e09c27272bd8ca72b312ea553a470b98731475ccf3
```

_Icon ClipboardText_

Looking at the predicate, you can immediately notice several differences. There is no ABI or implementation, but simply a main function that returns true or false.

```fuel_Box fuel_Box-idXKMmm-css
predicate;

fn main() -> bool {
    true
}
```

_Icon ClipboardText_

Notice that we have not "deployed" anything on the Fuel blockchain, yet we already have an address that we can interact with. It is important to remember this:

> _Icon InfoCircle_
>
> Predicates are created, not deployed.