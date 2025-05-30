[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Sway Program Types](https://docs.fuel.network/docs/sway/sway-program-types/) /

Predicates

## _Icon Link_ [Predicates](https://docs.fuel.network/docs/sway/sway-program-types/predicates/\#predicates)

From the perspective of Sway, predicates are programs that return a Boolean value and which represent ownership of some resource upon execution to true. They have no access to contract storage. Here is a trivial predicate, which always evaluates to true:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

// All predicates require a main function which returns a Boolean value.
fn main() -> bool {
    true
}
```

_Icon ClipboardText_

The address of this predicate is `0xd19a5fe4cb9baf41ad9813f1a6fef551107c8e8e3f499a6e32bccbb954a74764`. Any assets sent to this address can be unlocked or claimed by executing the predicate above as it always evaluates to true.

It does not need to be deployed to a blockchain because it only exists during a transaction. That being said, the predicate address is on-chain as the owner of one or more UTXOs.

## _Icon Link_ [Transfer Coins to a Predicate](https://docs.fuel.network/docs/sway/sway-program-types/predicates/\#transfer-coins-to-a-predicate)

In Fuel, coins can be sent to a predicate's address(the bytecode root, calculated [here _Icon Link_](https://github.com/FuelLabs/fuel-specs/blob/master/src/identifiers/predicate-id.md)).

## _Icon Link_ [Spending Predicate Coins](https://docs.fuel.network/docs/sway/sway-program-types/predicates/\#spending-predicate-coins)

The coin UTXOs become spendable not on the provision of a valid signature, but rather if the supplied predicate both has a root that matches their owner, and [evaluates _Icon Link_](https://github.com/FuelLabs/fuel-specs/blob/master/src/fuel-vm/index.md#predicate-verification) to `true`.

If a predicate reverts, or tries to access impure VM opcodes, the evaluation is automatically `false`.

An analogy for predicates is rather than a traditional 12 or 24 word seed phrase that generates a private key and creates a valid signature, a predicate's code can be viewed as the private key. Anyone with the code may execute a predicate, but only when the predicate evaluates to true may the assets owned by that address be released.

## _Icon Link_ [Spending Conditions](https://docs.fuel.network/docs/sway/sway-program-types/predicates/\#spending-conditions)

Predicates may introspect the transaction spending their coins (inputs, outputs, script bytecode, etc.) and may take runtime arguments, either or both of which may affect the evaluation of the predicate.

It is important to note that predicates cannot read or write memory. They may however check the inputs and outputs of a transaction. For example in the [OTC Predicate Swap Example _Icon Link_](https://github.com/FuelLabs/sway-applications/tree/master/OTC-swap-predicate), a user may specify they would like to swap `asset1` for `asset2` and with amount of `5`. The user would then send `asset1` to the predicate. Only when the predicate can verify that the outputs include `5` coins of `asset2` being sent to the original user, may `asset1` be transferred out of the predicate.

## _Icon Link_ [Debugging Predicates](https://docs.fuel.network/docs/sway/sway-program-types/predicates/\#debugging-predicates)

Because they don't have any side effects (they are _pure_), predicates cannot create receipts. Therefore, they cannot have logging or create a stack backtrace. This means that there is no native way to debug them aside from using a single-stepping debugger.

As a workaround, the predicate can be written, tested, and debugged first as a `script`, and then changed back into a `predicate`.