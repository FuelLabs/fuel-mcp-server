[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Testing](https://docs.fuel.network/docs/nightly/sway/testing/) /

Unit Testing

## _Icon Link_ [Unit Testing](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/\#unit-testing)

Forc provides built-in support for building and executing tests for a package.

Tests are written as free functions with the `#[test]` attribute.

For example:

```fuel_Box fuel_Box-idXKMmm-css
#[test]
fn test_meaning_of_life() {
    assert(6 * 7 == 42);
}
```

_Icon ClipboardText_

Each test function is ran as if it were the entry point for a
[script](https://docs.fuel.network/docs/nightly/sway/sway-program-types/scripts/). Tests "pass" if they return
successfully, and "fail" if they revert or vice versa while [testing failure](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/#testing-failure).

If the project has failing tests `forc test` will exit with exit status `101`.

## _Icon Link_ [Building and Running Tests](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/\#building-and-running-tests)

We can build and execute all tests within a package with the following:

```fuel_Box fuel_Box-idXKMmm-css
forc test
```

_Icon ClipboardText_

The output should look similar to this:

```fuel_Box fuel_Box-idXKMmm-css
  Compiled library "std".
  Compiled library "lib_single_test".
  Bytecode size is 92 bytes.
   Running 1 tests
      test test_meaning_of_life ... ok (170.652µs)
   Result: OK. 1 passed. 0 failed. Finished in 1.564996ms.
```

_Icon ClipboardText_

Visit the [`forc test`](https://docs.fuel.network/docs/nightly/forc/commands/forc_test/) command reference to find
the options available for `forc test`.

## _Icon Link_ [Testing Failure](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/\#testing-failure)

Forc supports testing failing cases for test functions declared with `#[test(should_revert)]`.

For example:

```fuel_Box fuel_Box-idXKMmm-css
#[test(should_revert)]
fn test_meaning_of_life() {
    assert(6 * 6 == 42);
}
```

_Icon ClipboardText_

It is also possible to specify an expected revert code, like the following example.

```fuel_Box fuel_Box-idXKMmm-css
#[test(should_revert = "18446744073709486084")]
fn test_meaning_of_life() {
    assert(6 * 6 == 42);
}
```

_Icon ClipboardText_

Tests with `#[test(should_revert)]` are considered to be passing if they are reverting.

## _Icon Link_ [Calling Contracts](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/\#calling-contracts)

Unit tests can call contract functions an example for such calls can be seen below.

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

_Icon ClipboardText_

To test the `test_function()`, a unit test like the following can be written.

```fuel_Box fuel_Box-idXKMmm-css
#[test]
fn test_success() {
    let caller = abi(MyContract, CONTRACT_ID);
    let result = caller.test_function {}();
    assert(result == true)
}
```

_Icon ClipboardText_

It is also possible to test failure with contract calls as well.

```fuel_Box fuel_Box-idXKMmm-css
#[test(should_revert)]
fn test_fail() {
    let caller = abi(MyContract, CONTRACT_ID);
    let result = caller.test_function {}();
    assert(result == false)
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** When running `forc test`, your contract will be built twice: first _without_ unit tests in order to determine the contract's ID, then a second time _with_ unit tests with the `CONTRACT_ID` provided to their namespace. This `CONTRACT_ID` can be used with the `abi` cast to enable contract calls within unit tests.

Unit tests can call methods of external contracts if those contracts are added as contract dependencies, i.e. in the [`contract-dependencies`](https://docs.fuel.network/docs/nightly/forc/manifest_reference/#the-contract-dependencies-section) section of the manifest file. An example of such calls is shown below:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi CallerContract {
    fn test_false() -> bool;
}

impl CallerContract for Contract {
    fn test_false() -> bool {
        false
    }
}

abi CalleeContract {
    fn test_true() -> bool;
}

#[test]
fn test_multi_contract_calls() {
    let caller = abi(CallerContract, CONTRACT_ID);
    let callee = abi(CalleeContract, callee::CONTRACT_ID);

    let should_be_false = caller.test_false();
    let should_be_true = callee.test_true();
    assert(!should_be_false);
    assert(should_be_true);
}
```

_Icon ClipboardText_

Example `Forc.toml` for contract above:

```fuel_Box fuel_Box-idXKMmm-css
[project]
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "main.sw"
license = "Apache-2.0"
name = "caller"

[dependencies]
std = { path = "../../../sway-lib-std/" }

[contract-dependencies]
callee = { path = "../callee" }
```

_Icon ClipboardText_

## _Icon Link_ [Running Tests in Parallel or Serially](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/\#running-tests-in-parallel-or-serially)

By default, all unit tests in your project are run in parallel. Note that this does not lead to any data races in storage because each unit test has its own storage space that is not shared by any other unit test.

By default, `forc test` will use all the available threads in your system. To request that a specific number of threads be used, the flag `--test-threads <val>` can be provided to `forc test`.

```fuel_Box fuel_Box-idXKMmm-css
forc test --test-threads 1
```

_Icon ClipboardText_

## _Icon Link_ [Logs Inside Tests](https://docs.fuel.network/docs/nightly/sway/testing/unit-testing/\#logs-inside-tests)

Forc has some capacity to help decode logs returned from the unit tests. You can use this feature to decode raw logs into a human readable format.

```fuel_Box fuel_Box-idXKMmm-css
script;

fn main() {}

#[test]
fn test_fn() {
let a = 10;
    log(a);
    let b = 30;
    log(b);
    assert_eq(a, 10)
    assert_eq(b, 30)
}
```

_Icon ClipboardText_

The example shown above is logging two different variables, `a` and `b` and their values are `10` and `30`, respectively. Without log decoding printed log for this test with `forc test --logs` ( `--logs` flag is required to see the logs for this example since the test is passing. Logs are silenced by default in passing tests, and can be enabled using the `--logs` flag.):

```fuel_Box fuel_Box-idXKMmm-css
Finished debug [unoptimized + fuel] target(s) in 5.23s
      Bytecode hash: 0x1cb1edc031691c5c08b50fd0f07b02431848ab81b325b72eb3fd233c67d6b548
   Running 1 test, filtered 0 tests
      test test_fn ... ok (38.875µs, 232 gas)
[{"LogData":{"data":"000000000000000a","digest":"8d85f8467240628a94819b26bee26e3a9b2804334c63482deacec8d64ab4e1e7","id":"0000000000000000000000000000000000000000000000000000000000000000","is":10368,"len":8,"pc":11032,"ptr":67107840,"ra":0,"rb":0}},{"LogData":{"data":"000000000000001e","digest":"48a97e421546f8d4cae1cf88c51a459a8c10a88442eed63643dd263cef880c1c","id":"0000000000000000000000000000000000000000000000000000000000000000","is":10368,"len":8,"pc":11516,"ptr":67106816,"ra":0,"rb":1}}]
```

_Icon ClipboardText_

This is not very easy to understand, it is possible to decode these logs with `--decode` flag, executing `forc test --logs --decode`:

```fuel_Box fuel_Box-idXKMmm-css
Finished debug [unoptimized + fuel] target(s) in 5.23s
      Bytecode hash: 0x1cb1edc031691c5c08b50fd0f07b02431848ab81b325b72eb3fd233c67d6b548
   Running 1 test, filtered 0 tests
      test test_fn ... ok (38.875µs, 232 gas)
Decoded log value: 10, log rb: 0
Decoded log value: 30, log rb: 1
```

_Icon ClipboardText_

As it can be seen, the values are human readable and easier to understand which makes debugging much more easier.

**Note**: This is an experimental feature and we are actively working on reporting variable names next to their values.