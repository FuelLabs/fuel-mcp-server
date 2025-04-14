[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Examples](https://docs.fuel.network/docs/nightly/sway/examples/) /

Fizzbuzz

## _Icon Link_ [`FizzBuzz`](https://docs.fuel.network/docs/nightly/sway/examples/fizzbuzz/\#fizzbuzz)

This example is not the traditional [`FizzBuzz` _Icon Link_](https://en.wikipedia.org/wiki/Fizz_buzz#Programming); instead it is the smart contract version! A script can call the `fizzbuzz` ABI method of this contract with some `u64` value and receive back the result as an `enum`.

The format for custom structs and enums such as `FizzBuzzResult` will be automatically included in the ABI JSON so that off-chain code can handle the encoded form of the returned data.

```fuel_Box fuel_Box-idXKMmm-css
contract;

enum FizzBuzzResult {
    Fizz: (),
    Buzz: (),
    FizzBuzz: (),
    Other: u64,
}

abi FizzBuzz {
    fn fizzbuzz(input: u64) -> FizzBuzzResult;
}

impl FizzBuzz for Contract {
    fn fizzbuzz(input: u64) -> FizzBuzzResult {
        if input % 15 == 0 {
            FizzBuzzResult::FizzBuzz
        } else if input % 3 == 0 {
            FizzBuzzResult::Fizz
        } else if input % 5 == 0 {
            FizzBuzzResult::Buzz
        } else {
            FizzBuzzResult::Other(input)
        }
    }
}

```

_Icon ClipboardText_