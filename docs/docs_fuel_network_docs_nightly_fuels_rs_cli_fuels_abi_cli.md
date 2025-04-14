[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[CLI](https://docs.fuel.network/docs/nightly/fuels-rs/cli/) /

Fuels ABI CLI

## _Icon Link_ [`fuels-abi-cli`](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#fuels-abi-cli)

Simple CLI program to encode Sway function calls and decode their output. The ABI being encoded and decoded is specified [here _Icon Link_](https://docs.fuel.network/docs/specs/abi/).

## _Icon Link_ [Usage](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#usage)

```fuel_Box fuel_Box-idXKMmm-css
sway-abi-cli 0.1.0
FuelVM ABI coder

USAGE:
    sway-abi-cli <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    codegen   Output Rust types file
    decode    Decode ABI call result
    encode    Encode ABI call
    help      Prints this message or the help of the given subcommand(s)
```

_Icon ClipboardText_

## _Icon Link_ [Examples](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#examples)

You can choose to encode only the given params or you can go a step further and have a full JSON ABI file and encode the whole input to a certain function call defined in the JSON file.

## _Icon Link_ [Encoding params only](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#encoding-params-only)

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- encode params -v bool true
0000000000000001
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- encode params -v bool true -v u32 42 -v u32 100
0000000000000001000000000000002a0000000000000064
```

_Icon ClipboardText_

Note that for every parameter you want to encode, you must pass a `-v` flag followed by the type, and then the value: `-v <type_1> <value_1> -v <type_2> <value_2> -v <type_n> <value_n>`

## _Icon Link_ [Encoding function call](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#encoding-function-call)

`example/simple.json`:

```fuel_Box fuel_Box-idXKMmm-css
[\
  {\
    "type":"function",\
    "inputs":[\
      {\
        "name":"arg",\
        "type":"u32"\
      }\
    ],\
    "name":"takes_u32_returns_bool",\
    "outputs":[\
      {\
        "name":"",\
        "type":"bool"\
      }\
    ]\
  }\
]
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- encode function examples/simple.json takes_u32_returns_bool -p 4
000000006355e6ee0000000000000004
```

_Icon ClipboardText_

`example/array.json`

```fuel_Box fuel_Box-idXKMmm-css
[\
  {\
    "type":"function",\
    "inputs":[\
      {\
        "name":"arg",\
        "type":"u16[3]"\
      }\
    ],\
    "name":"takes_array",\
    "outputs":[\
      {\
        "name":"",\
        "type":"u16[2]"\
      }\
    ]\
  }\
]
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- encode function examples/array.json takes_array -p '[1,2]'
00000000f0b8786400000000000000010000000000000002
```

_Icon ClipboardText_

Note that the first word (8 bytes) of the output is reserved for the function selector, which is captured in the last 4 bytes, which is simply the 256hash of the function signature.

Example with nested struct:

```fuel_Box fuel_Box-idXKMmm-css
[\
  {\
    "type":"contract",\
    "inputs":[\
      {\
        "name":"MyNestedStruct",\
        "type":"struct",\
        "components":[\
          {\
            "name":"x",\
            "type":"u16"\
          },\
          {\
            "name":"y",\
            "type":"struct",\
            "components":[\
              {\
                "name":"a",\
                "type":"bool"\
              },\
              {\
                "name":"b",\
                "type":"u8[2]"\
              }\
            ]\
          }\
        ]\
      }\
    ],\
    "name":"takes_nested_struct",\
    "outputs":[\
\
    ]\
  }\
]
```

Collapse_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- encode function examples/nested_struct.json takes_nested_struct -p '(10, (true, [1,2]))'
00000000e8a04d9c000000000000000a000000000000000100000000000000010000000000000002
```

_Icon ClipboardText_

## _Icon Link_ [Decoding params only](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#decoding-params-only)

Similar to encoding parameters only:

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- decode params -t bool -t u32 -t u32 0000000000000001000000000000002a0000000000000064
Bool(true)
U32(42)
U32(100)
```

_Icon ClipboardText_

## _Icon Link_ [Decoding function output](https://docs.fuel.network/docs/nightly/fuels-rs/cli/fuels-abi-cli/\#decoding-function-output)

```fuel_Box fuel_Box-idXKMmm-css
$ cargo run -- decode function examples/simple.json takes_u32_returns_bool 0000000000000001
Bool(true)
```

_Icon ClipboardText_