[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Predicates](https://docs.fuel.network/docs/fuels-ts/predicates/) /

Instantiating a Predicate

## _Icon Link_ [Instantiating predicates](https://docs.fuel.network/docs/fuels-ts/predicates/instantiating-a-predicate/\#instantiating-predicates)

A predicate in Sway can be as simple as the following:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

fn main() -> bool {
    true
}
```

_Icon ClipboardText_

In this minimal example, the `main` function does not accept any parameters and simply returns true.

Just like contracts in Sway, once you've created a predicate, you can compile it using `forc build`. For more information on working with Sway, refer to the Sway documentation.

After compiling, you will obtain the binary of the predicate and its JSON ABI (Application Binary Interface). Using these, you can instantiate a predicate in TypeScript as shown in the code snippet below:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const predicate = new ReturnTruePredicate({
  provider,
});
```

_Icon ClipboardText_

The created [`Predicate` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Predicate.html) instance, among other things, has three important properties: the predicate `bytes` (byte code), the `chainId`, and the predicate `address`.

This address, generated from the byte code, corresponds to the Pay-to-Script-Hash (P2SH) address used in Bitcoin.

## _Icon Link_ [Predicate with multiple arguments](https://docs.fuel.network/docs/fuels-ts/predicates/instantiating-a-predicate/\#predicate-with-multiple-arguments)

You can pass more than one argument to a predicate. For example, this is a predicate that evaluates to `true` if the two arguments are not equal:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

fn main(arg1: u64, arg2: u64) -> bool {
    return arg1 != arg2;
}
```

_Icon ClipboardText_

You can pass the two arguments to this predicate like this:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { PredicateMultiArgs } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const predicate = new PredicateMultiArgs({ provider, data: [20, 30] });
```

_Icon ClipboardText_

## _Icon Link_ [Predicate with a Struct argument](https://docs.fuel.network/docs/fuels-ts/predicates/instantiating-a-predicate/\#predicate-with-a-struct-argument)

You can also pass a struct as an argument to a predicate. This is one such predicate that expects a struct as an argument:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

struct Validation {
    has_account: bool,
    total_complete: u64,
}

fn main(received: Validation) -> bool {
    let expected_has_account: bool = true;
    let expected_total_complete: u64 = 100;

    received.has_account == expected_has_account && received.total_complete == expected_total_complete
}
```

_Icon ClipboardText_

You can pass a struct as an argument to this predicate like this:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { PredicateMainArgsStruct } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const predicate = new PredicateMainArgsStruct({
  provider,
  data: [{ has_account: true, total_complete: 100 }],
});

```

_Icon ClipboardText_