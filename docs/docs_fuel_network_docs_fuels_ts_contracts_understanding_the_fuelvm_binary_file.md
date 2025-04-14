[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/) /

Understanding the FuelVM Binary File

## _Icon Link_ [Understanding the FuelVM Binary File](https://docs.fuel.network/docs/fuels-ts/contracts/understanding-the-fuelvm-binary-file/\#understanding-the-fuelvm-binary-file)

When you compile your Sway code using the `forc build` command, it generates a bytecode file. This binary file contains the compiled code that the Fuel Virtual Machine (FuelVM) will interpret and execute.

For example, consider the following smart contract:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::b512::B512;

abi EchoValues {
    fn echo_u8(value: u8) -> u8;

    fn echo_str_8(value: str[8]) -> str[8];

    fn echo_str(value: str) -> str;

    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64);

    fn echo_b512(input: B512) -> B512;

    fn echo_u64(value: u64) -> u64;

    fn echo_u64_array(u64_array: [u64; 2]) -> [u64; 2];
}

impl EchoValues for Contract {
    fn echo_u8(value: u8) -> u8 {
        value
    }

    fn echo_str(value: str) -> str {
        value
    }

    fn echo_str_8(value: str[8]) -> str[8] {
        value
    }

    fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64) {
        tuple
    }

    fn echo_b512(input: B512) -> B512 {
        input
    }
    fn echo_u64(value: u64) -> u64 {
        value
    }

    fn echo_u64_array(u64_array: [u64; 2]) -> [u64; 2] {
        u64_array
    }
}
```

Collapse_Icon ClipboardText_

After running `forc build`, a binary file will be generated with the following content:

```fuel_Box fuel_Box-idXKMmm-css
$ cat out/debug/echo-values.bin
�GT]����]@`I]G�I@sH]G�I@sHr�{6�]D`J]C�%E]@`J$@Ͼ{RD�^�%
```

_Icon ClipboardText_

At first glance, the content appears unreadable. However, `forc` provides a helpful interpreter for this bytecode: the `forc parse-bytecode` command. This command takes the binary data and outputs the equivalent FuelVM assembly:

```fuel_Box fuel_Box-idXKMmm-css
$ forc parse-bytecode out/debug/echo-values.bin
half-word   byte   op                raw           notes
        0   0      JI(4)             90 00 00 04   jump to byte 16
        1   4      NOOP              47 00 00 00
        2   8      Undefined         00 00 00 00   data section offset lo (0)
        3   12     Undefined         00 00 00 34   data section offset hi (52)
        4   16     LW(63, 12, 1)     5d fc c0 01
        5   20     ADD(63, 63, 12)   10 ff f3 00
        6   24     LW(17, 6, 73)     5d 44 60 49
        7   28     LW(16, 63, 1)     5d 43 f0 01
        8   32     EQ(16, 17, 16)    13 41 14 00
        9   36     JNZI(16, 11)      73 40 00 0b   conditionally jump to byte 44
       10   40     RVRT(0)           36 00 00 00
       11   44     LW(16, 63, 0)     5d 43 f0 00
       12   48     RET(16)           24 40 00 00
       13   52     Undefined         00 00 00 00
       14   56     Undefined         00 00 00 01
       15   60     Undefined         00 00 00 00
       16   64     XOR(20, 27, 53)   21 51 bd 4b
```

_Icon ClipboardText_

When deploying your smart contract using the SDK, the binary file plays a crucial role. It is sent to the FuelVM in a transaction, allowing the FuelVM to interpret and execute your smart contract.