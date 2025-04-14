[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Parse Bytecode

## _Icon Link_ [Parse](https://docs.fuel.network/docs/nightly/forc/commands/forc_parse-bytecode/\#forc-parse-bytecode)

Usage: forc parse-bytecode \[OPTIONS\] <FILE\_PATH>

Arguments:

< _FILE\_PATH_ \>

Options:

`-v`, `--verbose...`

Use verbose output

`-s`, `--silent`

Silence all output

`-L`, `--log-level` < _LOG\_LEVEL_ \>

Set the log level

`-h`, `--help`

Print help

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Parse bytecode](https://docs.fuel.network/docs/nightly/forc/commands/forc_parse-bytecode/\#forc-parse-bytecode)

forc parse-bytecode

## _Icon Link_ [EXAMPLE](https://docs.fuel.network/docs/nightly/forc/commands/forc_parse-bytecode/\#forc-parse-bytecode)

We can try this command with the initial project created using `forc init`, with the counter template:

```fuel_Box fuel_Box-idXKMmm-css
forc new --template counter counter
cd counter
forc build -o obj

```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
counter$ forc parse-bytecode obj

  half-word   byte   op                   raw           notes
          0   0      JI(4)                90 00 00 04   conditionally jumps to byte 16
          1   4      NOOP                 47 00 00 00
          2   8      Undefined            00 00 00 00   data section offset lo (0)
          3   12     Undefined            00 00 00 c8   data section offset hi (200)
          4   16     LW(63, 12, 1)        5d fc c0 01
          5   20     ADD(63, 63, 12)      10 ff f3 00
         ...
         ...
         ...
         60   240    Undefined            00 00 00 00
         61   244    Undefined            fa f9 0d d3
         62   248    Undefined            00 00 00 00
         63   252    Undefined            00 00 00 c8

```

_Icon ClipboardText_