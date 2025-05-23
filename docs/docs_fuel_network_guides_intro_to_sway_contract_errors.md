[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Errors

## _Icon Link_ [Defining Error Handling](https://docs.fuel.network/guides/intro-to-sway/contract-errors/\#defining-error-handling)

Enumerations, commonly referred to as enums, are a type that can represent one of several possible variants. Within our contract, we can employ enums to craft custom error messages, facilitating more precise error handling within functions.

Copy the custom error block into your `main.sw` file:

```fuel_Box fuel_Box-idXKMmm-css
enum InvalidError {
    IncorrectAssetId: AssetId,
    NotEnoughTokens: u64,
    OnlyOwner: Identity,
}
```

_Icon ClipboardText_

Within our contract, we can anticipate various scenarios where we'd want to throw an error and halt the transaction:

1. Someone might attempt to pay for an item using an incorrect currency.
2. An individual could try to purchase an item without possessing sufficient coins.
3. Someone other than the owner might attempt to withdraw funds from the contract.

For each situation, we can define specific return types for the errors:

- For the `IncorrectAssetId` error, we can return the submitted asset id, which is of type `AssetId`.
- In the case of the `NotEnoughTokens` error, we can define the return type as `u64` to indicate the number of coins involved.
- For the `OnlyOwner` error, we can utilize the `Identity` of the message sender as the return value.