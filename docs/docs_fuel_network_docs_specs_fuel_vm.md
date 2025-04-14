[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

Fuel Vm

## _Icon Link_ [Fuel VM Specification](https://docs.fuel.network/docs/specs/fuel-vm/\#fuel-vm-specification)

- [Introduction](https://docs.fuel.network/docs/specs/fuel-vm/#introduction)
- [Parameters](https://docs.fuel.network/docs/specs/fuel-vm/#parameters)
- [Semantics](https://docs.fuel.network/docs/specs/fuel-vm/#semantics)
- [Flags](https://docs.fuel.network/docs/specs/fuel-vm/#flags)
- [Instruction Set](https://docs.fuel.network/docs/specs/fuel-vm/#instruction-set)
- [VM Initialization](https://docs.fuel.network/docs/specs/fuel-vm/#vm-initialization)
- [Contexts](https://docs.fuel.network/docs/specs/fuel-vm/#contexts)
- [Predicate Estimation](https://docs.fuel.network/docs/specs/fuel-vm/#predicate-estimation)
- [Predicate Verification](https://docs.fuel.network/docs/specs/fuel-vm/#predicate-verification)
- [Script Execution](https://docs.fuel.network/docs/specs/fuel-vm/#script-execution)
- [Call Frames](https://docs.fuel.network/docs/specs/fuel-vm/#call-frames)
- [Ownership](https://docs.fuel.network/docs/specs/fuel-vm/#ownership)

## _Icon Link_ [Introduction](https://docs.fuel.network/docs/specs/fuel-vm/\#introduction)

This document provides the specification for the Fuel Virtual Machine (FuelVM). The specification covers the types, instruction set, and execution semantics.

## _Icon Link_ [Parameters](https://docs.fuel.network/docs/specs/fuel-vm/\#parameters)

| name | type | value | note |
| --- | --- | --- | --- |
| `CONTRACT_MAX_SIZE` | `uint64` |  | Maximum contract size, in bytes. |
| `VM_MAX_RAM` | `uint64` | `2**26` | 64 MiB. |
| `MESSAGE_MAX_DATA_SIZE` | `uint64` |  | Maximum size of message data, in bytes. |

## _Icon Link_ [Semantics](https://docs.fuel.network/docs/specs/fuel-vm/\#semantics)

FuelVM instructions are exactly 32 bits (4 bytes) wide and comprise of a combination of:

- Opcode: 8 bits
- Register/special register (see below) identifier: 6 bits
- Immediate value: 12, 18, or 24 bits, depending on operation

Of the 64 registers (6-bit register address space), the first `16` are reserved:

| value | register | name | description |
| --- | --- | --- | --- |
| `0x00` | `$zero` | zero | Contains zero ( `0`), for convenience. |
| `0x01` | `$one` | one | Contains one ( `1`), for convenience. |
| `0x02` | `$of` | overflow | Contains overflow/underflow of addition, subtraction, and multiplication. |
| `0x03` | `$pc` | program counter | The program counter. Memory address of the current instruction. |
| `0x04` | `$ssp` | stack start pointer | Memory address of bottom of current writable stack area. |
| `0x05` | `$sp` | stack pointer | Memory address on top of current writable stack area (points to free memory). |
| `0x06` | `$fp` | frame pointer | Memory address of beginning of current call frame. |
| `0x07` | `$hp` | heap pointer | Memory address below the current bottom of the heap (points to used/OOB memory). |
| `0x08` | `$err` | error | Error codes for particular operations. |
| `0x09` | `$ggas` | global gas | Remaining gas globally. |
| `0x0A` | `$cgas` | context gas | Remaining gas in the context. |
| `0x0B` | `$bal` | balance | Received balance for this context. |
| `0x0C` | `$is` | instructions start | Pointer to the start of the currently-executing code. |
| `0x0D` | `$ret` | return value | Return value or pointer. |
| `0x0E` | `$retl` | return length | Return value length in bytes. |
| `0x0F` | `$flag` | flags | Flags register. |

Integers are represented in [big-endian _Icon Link_](https://en.wikipedia.org/wiki/Endianness) format, and all operations are unsigned. Boolean `false` is `0` and Boolean `true` is `1`.

Registers are 64 bits (8 bytes) wide. Words are the same width as registers.

Persistent state (i.e. storage) is a key-value store with 32-byte keys and 32-byte values. Each contract has its own persistent state that is independent of other contracts. This is committed to in a Sparse Binary Merkle Tree.

## _Icon Link_ [Flags](https://docs.fuel.network/docs/specs/fuel-vm/\#flags)

| value | name | description |
| --- | --- | --- |
| `0x01` | `F_UNSAFEMATH` | If set, undefined arithmetic zeroes target and sets `$err` without panic. |
| `0x02` | `F_WRAPPING` | If set, overflowing arithmetic wraps around and sets `$of` without panic. |

All other flags are reserved, any must be set to zero.

## _Icon Link_ [Instruction Set](https://docs.fuel.network/docs/specs/fuel-vm/\#instruction-set)

A complete instruction set of the Fuel VM is documented in [the following page](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/).

## _Icon Link_ [VM Initialization](https://docs.fuel.network/docs/specs/fuel-vm/\#vm-initialization)

Every time the VM runs, a single monolithic memory of size `VM_MAX_RAM` bytes is allocated, indexed by individual byte. A stack and heap memory model is used, allowing for dynamic memory allocation in higher-level languages. The stack begins at `0` and grows upward. The heap begins at `VM_MAX_RAM` and grows downward.

To initialize the VM, the following is pushed on the stack sequentially:

1. Transaction hash ( `byte[32]`, word-aligned), computed as defined [here](https://docs.fuel.network/docs/specs/identifiers/transaction-id/).
2. Base asset ID ( `byte[32]`, word-aligned)
3. [`MAX_INPUTS`](https://docs.fuel.network/docs/specs/tx-format/consensus_parameters/) pairs of `(asset_id: byte[32], balance: uint64)`, of:

1. For [predicate estimation](https://docs.fuel.network/docs/specs/fuel-vm/#predicate-estimation) and [predicate verification](https://docs.fuel.network/docs/specs/fuel-vm/#predicate-verification), zeroes.
2. For [script execution](https://docs.fuel.network/docs/specs/fuel-vm/#script-execution), the free balance for each asset ID seen in the transaction's inputs, ordered in ascending order. If there are fewer than `MAX_INPUTS` asset IDs, the pair has a value of zero.
4. Transaction length, in bytes ( `uint64`, word-aligned).
5. The [transaction, serialized](https://docs.fuel.network/docs/specs/tx-format/).

Then the following registers are initialized (without explicit initialization, all registers are initialized to zero):

1. `$ssp = 32 + 32 + MAX_INPUTS*(32+8) + size(tx))`: the writable stack area starts immediately after the serialized transaction in memory (see above).
2. `$sp = $ssp`: writable stack area is empty to start.
3. `$hp = VM_MAX_RAM`: the heap area begins at the top and is empty to start.

## _Icon Link_ [Contexts](https://docs.fuel.network/docs/specs/fuel-vm/\#contexts)

There are 4 _contexts_ in the FuelVM: [predicate estimation](https://docs.fuel.network/docs/specs/fuel-vm/#predicate-estimation), [predicate verification](https://docs.fuel.network/docs/specs/fuel-vm/#predicate-verification), [scripts](https://docs.fuel.network/docs/specs/fuel-vm/#script-execution), and [calls](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#call-call-contract). A context is an isolated execution environment with defined [memory ownership](https://docs.fuel.network/docs/specs/fuel-vm/#ownership) and can be _external_ or _internal_:

- External: predicate and script. `$fp` will be zero.
- Internal: call. `$fp` will be non-zero.

[Returning](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#return-return-from-call) from a context behaves differently depending on whether the context is external or internal.

## _Icon Link_ [Predicate Estimation](https://docs.fuel.network/docs/specs/fuel-vm/\#predicate-estimation)

For any input of type [`InputType.Coin`](https://docs.fuel.network/docs/specs/tx-format/) or [`InputType.Message`](https://docs.fuel.network/docs/specs/tx-format/), a non-zero `predicateLength` field means the UTXO being spent is a [`P2SH` _Icon Link_](https://en.bitcoin.it/wiki/P2SH) rather than a [`P2PKH` _Icon Link_](https://en.bitcoin.it/P2PKH) output.

For each such input in the transaction, the VM is [initialized](https://docs.fuel.network/docs/specs/fuel-vm/#vm-initialization), then:

1. `$pc` and `$is` are set to the start of the input's `predicate` field.
2. `$ggas` and `$cgas` are set to `MAX_GAS_PER_PREDICATE`.

Predicate estimation will fail if gas is exhausted during execution.

During predicate mode, hitting any of the following instructions causes predicate estimation to halt, returning Boolean `false`:

1. Any [contract instruction](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#contract-instructions).

In addition, during predicate mode if `$pc` is set to a value greater than the end of predicate bytecode (this would allow bytecode outside the actual predicate), predicate estimation halts returning Boolean `false`.

A predicate that halts without returning Boolean `true` would not pass verification, making the entire transaction invalid. Note that predicate validity is monotonic with respect to time (i.e. if a predicate evaluates to `true` then it will always evaluate to `true` in the future).

After successful execution, `predicateGasUsed` is set to `MAX_GAS_PER_PREDICATE - $ggas`.

## _Icon Link_ [Predicate Verification](https://docs.fuel.network/docs/specs/fuel-vm/\#predicate-verification)

For any input of type [`InputType.Coin`](https://docs.fuel.network/docs/specs/tx-format/input/#inputcoin) or [`InputType.Message`](https://docs.fuel.network/docs/specs/tx-format/input/#inputmessage), a non-zero `predicateLength` field means the UTXO being spent is a [`P2SH` _Icon Link_](https://en.bitcoin.it/P2SH) rather than a [`P2PKH` _Icon Link_](https://en.bitcoin.it/P2PKH) output.

For each such input in the transaction, the VM is [initialized](https://docs.fuel.network/docs/specs/fuel-vm/#vm-initialization), then:

1. `$pc` and `$is` are set to the start of the input's `predicate` field.
2. `$ggas` and `$cgas` are set to `predicateGasUsed`.

Predicate verification will fail if gas is exhausted during execution.

During predicate mode, hitting any [contract instruction](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#contract-instructions) causes predicate verification to halt, returning Boolean `false`.

In addition, during predicate mode if `$pc` is set to a value greater than the end of predicate bytecode (this would allow bytecode outside the actual predicate), predicate verification halts returning Boolean `false`.

A predicate that halts without returning Boolean `true` does not pass verification, making the entire transaction invalid. Note that predicate validity is monotonic with respect to time (i.e. if a predicate evaluates to `true` then it will always evaluate to `true` in the future).

After execution, if `$ggas` is non-zero, predicate verification fails.

## _Icon Link_ [Script Execution](https://docs.fuel.network/docs/specs/fuel-vm/\#script-execution)

If script bytecode is present, transaction validation requires execution.

The VM is [initialized](https://docs.fuel.network/docs/specs/fuel-vm/#vm-initialization), then:

1. `$pc` and `$is` are set to the start of the transaction's script bytecode.
2. `$ggas` and `$cgas` are set to `tx.scriptGasLimit`.

Following initialization, execution begins.

For each instruction, its gas cost `gc` is first computed. If `gc > $cgas`, deduct `$cgas` from `$ggas` and `$cgas` (i.e. spend all of `$cgas` and no more), then [revert](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#rvrt-revert) immediately without actually executing the instruction. Otherwise, deduct `gc` from `$ggas` and `$cgas`.

After the script has been executed, `tx.receiptsRoot` is updated to contain the Merkle root of the receipts, [as described in the `TransactionScript` spec](https://docs.fuel.network/docs/specs/tx-format/transaction/#%60transactionscript%60).

## _Icon Link_ [Call Frames](https://docs.fuel.network/docs/specs/fuel-vm/\#call-frames)

Cross-contract calls push a _call frame_ onto the stack, similar to a stack frame used in regular languages for function calls (which may be used by a high-level language that targets the FuelVM). The distinction is as follows:

1. Stack frames: store metadata across trusted internal (i.e. intra-contract) function calls. Not supported natively by the FuelVM, but may be used as an abstraction at a higher layer.
2. Call frames: store metadata across untrusted external (i.e. inter-contract) calls. Supported natively by the FuelVM.

Call frames are needed to ensure that the called contract cannot mutate the running state of the current executing contract. They segment access rights for memory: the currently-executing contracts may only write to their own call frame and their own heap.

A call frame consists of the following, word-aligned:

| bytes | type | value | description |
| --- | --- | --- | --- |
|  |  |  | **Unwritable area begins.** |
| 32 | `byte[32]` | `to` | Contract ID for this call. |
| 32 | `byte[32]` | `asset_id` | asset ID of forwarded coins. |
| 8\*64 | `byte[8][64]` | `regs` | Saved registers from previous context. |
| 8 | `uint64` | `codesize` | Code size in bytes, padded to the next word boundary. |
| 8 | `byte[8]` | `param1` | First parameter. |
| 8 | `byte[8]` | `param2` | Second parameter. |
| 1\* | `byte[]` | `code` | Zero-padded to 8-byte alignment, but individual instructions are not aligned. |
|  |  |  | **Unwritable area ends.** |
| \* |  |  | Call frame's stack. |

## _Icon Link_ [Access rights](https://docs.fuel.network/docs/specs/fuel-vm/\#access-rights)

Only memory that has been allocated is accessible.
In other words, memory between highest-ever `$sp` value and current `$hp`
is inaccessible. Attempting to read or write
memory that has not been allocated will result in VM panic.
Similarly reads or writes that cross from the stack to the heap
will panic. Note that stack remains readable even after stack
frame has been shrunk. However, if the heap is afterwards expanded
to cover that area, the crossing read prohibition still remains,
while all memory is accessible.

## _Icon Link_ [Ownership](https://docs.fuel.network/docs/specs/fuel-vm/\#ownership)

Whenever memory is written to (i.e. with [`SB`](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#sb-store-byte) or [`SW`](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#sw-store-word)), or write access is granted (i.e. with [`CALL`](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#call-call-contract)), ownership must be checked.

If the context is external, the owned memory range is:

1. `[$ssp, $sp)`: the writable stack area.\
2. `[$hp, VM_MAX_RAM)`: the heap area allocated by this script or predicate.\
\
If the context is internal, the owned memory range for a call frame is:\
\
1. `[$ssp, $sp)`: the writable stack area of the call frame.\
2. `[$hp, $fp->$hp)`: the heap area allocated by this call frame.\
\
## _Icon Link_ [Executability](https://docs.fuel.network/docs/specs/fuel-vm/\#executability)\
\
Memory is only executable in range `[$is, $ssp)`. Attempting to execute instructions outside these boundaries will cause a panic. This area never overlaps with writable memory, essentially providing [W^X _Icon Link_](https://en.wikipedia.org/wiki/W%5EX) protection.