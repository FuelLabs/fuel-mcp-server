[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Call

## _Icon Link_ [Forc Call](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#forc-call)

`forc-call` is a command-line tool for interacting with deployed Fuel contracts. It allows you to make contract calls, query contract state, and interact with any deployed contract on the Fuel network - all from your command line!

The `forc call` command is part of the Forc toolchain and is installed alongside other Forc tools.

## _Icon Link_ [Getting Started](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#getting-started)

Here are a few examples of what you can do with `forc call`:

Call a simple addition function on a deployed contract (in dry-run mode):

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi ContractABI {
  fn add(a: u64, b: u64) -> u64;
}

impl ContractABI for Contract {
  fn add(a: u64, b: u64) -> u64 {
    a + b
  }
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
forc call 0xe18de7c7c8c61a1c706dccb3533caa00ba5c11b5230da4428582abf1b6831b4d \
  --abi ./out/debug/counter-contract-abi.json \
  add 1 2
```

_Icon ClipboardText_

Query the owner of a deployed [DEX contract _Icon Link_](https://github.com/mira-amm/mira-v1-core) on testnet:

```fuel_Box fuel_Box-idXKMmm-css
forc call \
  --testnet \
  --abi https://raw.githubusercontent.com/mira-amm/mira-v1-periphery/refs/heads/main/fixtures/mira-amm/mira_amm_contract-abi.json \
  0xd5a716d967a9137222219657d7877bd8c79c64e1edb5de9f2901c98ebe74da80 \
  owner
```

_Icon ClipboardText_

## _Icon Link_ [Usage](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#usage)

The basic syntax for `forc call` is:

```fuel_Box fuel_Box-idXKMmm-css
forc call [OPTIONS] --abi <ABI-PATH/URL> <CONTRACT_ID> <SELECTOR> [ARGS]...
```

_Icon ClipboardText_

Where the following arguments are required:

- `CONTRACT_ID` is the ID of the deployed contract you want to interact with
- `ABI-PATH/URL` is the path or URL to the contract's JSON ABI file
- `SELECTOR` is the function name (selector) you want to call
- `ARGS` are the arguments to pass to the function

## _Icon Link_ [Type Encoding](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#type-encoding)

When passing arguments to contract functions, values are encoded according to their Sway types.
Here's how to format different types:

| Types | Example input | Notes |
| --- | --- | --- |
| bool | `true` or `false` |  |
| u8, u16, u32, u64, u128, u256 | `42` |  |
| b256 | `0x0000000000000000000000000000000000000000000000000000000000000042` or `0000000000000000000000000000000000000000000000000000000000000042` | `0x` prefix is optional |
| bytes, RawSlice | `0x42` or `42` | `0x` prefix is optional |
| String, StringSlice, StringArray (Fixed-size) | `"abc"` |  |
| Tuple | `(42, true)` | The types in tuple can be different |
| Array (Fixed-size), Vector (Dynamic) | `[42, 128]` | The types in array or vector must be the same; i.e. you cannot have `[42, true]` |
| Struct | `{42, 128}` | Since structs are packed encoded, the attribute names are not encoded; i.e. `{42, 128}`; this could represent the following `struct Polygon { x: u64, y: u64 }` |
| Enum | `(Active: true)` or `(1: true)` | Enums are key-val pairs with keys as being variant name (case-sensitive) or variant index (starting from 0) and values as being the variant value; this could represent the following `enum MyEnum { Inactive, Active(bool) }` |

## _Icon Link_ [ABI Support](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#abi-support)

The ABI (Application Binary Interface) can be provided in two ways.

## _Icon Link_ [Local file](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#local-file)

```fuel_Box fuel_Box-idXKMmm-css
forc call <CONTRACT_ID> --abi ./path/to/abi.json <FUNCTION> [ARGS...]
```

_Icon ClipboardText_

## _Icon Link_ [Remote ABI file/URL](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#remote-abi-fileurl)

```fuel_Box fuel_Box-idXKMmm-css
forc call <CONTRACT_ID> --abi https://example.com/abi.json <FUNCTION> [ARGS...]
```

_Icon ClipboardText_

## _Icon Link_ [Network Configuration](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#network-configuration)

```fuel_Box fuel_Box-idXKMmm-css
forc call --node-url http://127.0.0.1:4000 ...
# or
forc call --target local ...
```

_Icon ClipboardText_

## _Icon Link_ [Advanced Usage](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#advanced-usage)

## _Icon Link_ [Using Wallets](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#using-wallets)

```fuel_Box fuel_Box-idXKMmm-css
# utilising the forc-wallet
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> --wallet
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
# with an explicit signing key
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> --signing-key <KEY>
```

_Icon ClipboardText_

## _Icon Link_ [Asset Transfers](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#asset-transfers)

```fuel_Box fuel_Box-idXKMmm-css
# Native asset transfer
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> --amount 100 --live
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
# Custom asset transfer
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> \
    --amount 100 \
    --asset-id 0x1234... \
    --live
```

_Icon ClipboardText_

## _Icon Link_ [Gas Configuration](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#gas-configuration)

```fuel_Box fuel_Box-idXKMmm-css
# Set gas price
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> --gas-price 1

# Forward gas to contract
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> --gas-forwarded 1000

# Set maximum fee
forc call <CONTRACT_ID> --abi <PATH> <FUNCTION> --max-fee 5000
```

_Icon ClipboardText_

## _Icon Link_ [Common Use Cases](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#common-use-cases)

## _Icon Link_ [Contract State Queries](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#contract-state-queries)

```fuel_Box fuel_Box-idXKMmm-css
# Read contract state
forc call <CONTRACT_ID> --abi <PATH> get_balance

# Query with parameters
forc call <CONTRACT_ID> --abi <PATH> get_user_info 0x1234...
```

_Icon ClipboardText_

## _Icon Link_ [Token Operations](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#token-operations)

```fuel_Box fuel_Box-idXKMmm-css
# Check token balance
forc call <CONTRACT_ID> --abi <PATH> balance_of 0x1234...

# Transfer tokens
forc call <CONTRACT_ID> --abi <PATH> transfer 0x1234... 100 --live
```

_Icon ClipboardText_

## _Icon Link_ [Contract Administration](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#contract-administration)

```fuel_Box fuel_Box-idXKMmm-css
# Check contract owner
forc call <CONTRACT_ID> --abi <PATH> owner

# Update contract parameters
forc call <CONTRACT_ID> --abi <PATH> update_params 42 --live
```

_Icon ClipboardText_

## _Icon Link_ [Tips and Tricks](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#tips-and-tricks)

- Use `--mode simulate` to estimate gas costs before making live transactions
- External contracts are automatically detected (via internal simulations), but can be manually specified with `--external-contracts`
- For complex parameter types (tuples, structs, enums), refer to the parameter types table above
- Always verify contract addresses and ABIs before making live calls
- Use environment variables for sensitive data like signing keys: `SIGNING_KEY=<key>`

## _Icon Link_ [Troubleshooting](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#troubleshooting)

## _Icon Link_ [Common issues and solutions](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#common-issues-and-solutions)

- **ABI Mismatch**:
  - Ensure the ABI matches the deployed contract
  - Verify function selectors match exactly
- **Parameter Type Errors**:
  - Check parameter formats in the types table
  - Ensure correct number of parameters
- **Network Issues**:
  - Verify node connection
  - Check network selection (testnet/mainnet)
- **Transaction Failures**:
  - Use simulation mode to debug
  - Check gas settings
  - Verify wallet has sufficient balance

## _Icon Link_ [Future Features](https://docs.fuel.network/docs/nightly/forc/plugins/forc_call/\#future-features)

The following features are planned for future releases:

- Support direct transfer of asset(s) to addresses
- Function signature based calls without ABI
- Raw calldata input support
- Function selector completion
- Enhanced error messages, debugging, and logging (additional verbosity modes)