[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Debugging With Scripts

## _Icon Link_ [Debugging with Scripts](https://docs.fuel.network/guides/intro-to-predicates/debugging-with-scripts/\#debugging-with-scripts)

In every aspect of development, trade-offs are inevitable. As previously mentioned, logging is not feasible when dealing with predicates, since predicates are required to be pure. This raises an important question: how do we debug predicates?

Sway, a programming language, categorizes programs into four types, with scripts being one of them. Unlike predicates, scripts allow for shared logic.

Let's move outside our MultiSig project

```fuel_Box fuel_Box-idXKMmm-css
cd ../..
```

_Icon ClipboardText_

and create a separate project called `predicate-script-logging`.

```fuel_Box fuel_Box-idXKMmm-css
forc new --predicate predicate-script-logging
```

_Icon ClipboardText_

Copy and paste this new predicate in your `src/main.sw`. Attempting to build this predicate will result in an error, indicating that logging is an invalid operation.

```fuel_Box fuel_Box-idXKMmm-css
predicate;

use std::{
    logging::log,
};

configurable {
    SECRET_NUMBER: u64 = 777
}

fn main() -> bool {
    log(SECRET_NUMBER);
    return true;
}
```

_Icon ClipboardText_

However, let's try switching the program type from a `predicate` to a `script`.

```fuel_Box fuel_Box-idXKMmm-css
script;
```

_Icon ClipboardText_

Your code should now look like this:

```fuel_Box fuel_Box-idXKMmm-css
script;

use std::{
    logging::log,
};

configurable {
    SECRET_NUMBER: u64 = 777
}

fn main() -> bool {
    log(SECRET_NUMBER);
    return true;
}
```

_Icon ClipboardText_

Now, if we attempt to build our script, it should compile without any issues.

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

Next, we'll generate a Rust template to see it in action!