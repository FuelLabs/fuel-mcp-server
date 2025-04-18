[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[ABI](https://docs.fuel.network/docs/specs/abi/) /

Receipts

## _Icon Link_ [Receipts](https://docs.fuel.network/docs/specs/abi/receipts/\#receipts)

Upon execution of ABI calls, i.e scripts being executed, a JSON object representing a list of receipts will be returned to the caller. Below is the JSON specification of the possible receipt types. The root will be `receipts_root` which will include an array of `receipts`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "receipts_list":[\
    {\
      "type":"<receipt_type>",\
      ...\
    },\
    ...\
  ]
}
```

_Icon ClipboardText_

All receipts will have a `type` property:

- `type`: String; the type of the receipt. Can be one of:

  - [`Call`](https://docs.fuel.network/docs/specs/abi/receipts/#call-receipt)
  - [`Return`](https://docs.fuel.network/docs/specs/abi/receipts/#return-receipt)
  - [`ReturnData`](https://docs.fuel.network/docs/specs/abi/receipts/#returndata-receipt)
  - [`Panic`](https://docs.fuel.network/docs/specs/abi/receipts/#panic-receipt)
  - [`Revert`](https://docs.fuel.network/docs/specs/abi/receipts/#revert-receipt)
  - [`Log`](https://docs.fuel.network/docs/specs/abi/receipts/#log-receipt)
  - [`Mint`](https://docs.fuel.network/docs/specs/abi/receipts/#mint-receipt)
  - [`Burn`](https://docs.fuel.network/docs/specs/abi/receipts/#burn-receipt)
  - [`LogData`](https://docs.fuel.network/docs/specs/abi/receipts/#logdata-receipt)
  - [`Transfer`](https://docs.fuel.network/docs/specs/abi/receipts/#transfer-receipt)
  - [`TransferOut`](https://docs.fuel.network/docs/specs/abi/receipts/#transferout-receipt)
  - [`ScriptResult`](https://docs.fuel.network/docs/specs/abi/receipts/#scriptresult-receipt)
  - [`MessageOut`](https://docs.fuel.network/docs/specs/abi/receipts/#messageout-receipt)

Then, each receipt type will have its own properties. Some of these properties are related to the FuelVM's registers, as specified in more detail [here](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/).

_Important note:_ For the JSON representation of receipts, we represent 64-bit unsigned integers as a JSON `String` due to limitations around the type `Number` in the JSON specification, which only supports numbers up to `2^{53-1}`, while the FuelVM's registers hold values up to `2^64`.

## _Icon Link_ [Panic Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#panic-receipt)

- `type`: `Panic`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `reason`: Optional decimal string representation of an 8-bit unsigned integer; panic reason.
Not included in canonical receipt form.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.
- `contractId`: Optional hexadecimal string representation of the 256-bit (32-byte) contract ID if applicable. `null` otherwise.
Not included in canonical receipt form. Primary use is for access-list estimation by SDK.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Panic",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "reason": "1",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe",
  "contractId": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Return` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#return-receipt)

- `type`: `Return`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context; `null` otherwise.
- `val`: Decimal string representation of a 64-bit unsigned integer; value of register `$rA`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Return",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "val": "18446744073709551613",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Call` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#call-receipt)

- `type`: `Call`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context; `null` otherwise.
- `to`: Hexadecimal representation of the 256-bit (32-byte) contract ID of the callee.
- `amount`: Decimal string representation of a 64-bit unsigned integer; amount of coins to forward.
- `asset_id`: Hexadecimal string representation of the 256-bit (32-byte) asset ID of coins to forward.
- `gas`: Decimal string representation of a 64-bit unsigned integer; amount gas to forward; value in register `$rD`.
- `param1`: Hexadecimal string representation of a 64-bit unsigned integer; first parameter, holds the function selector.
- `param2`: Hexadecimal string representation of a 64-bit unsigned integer; second parameter, typically used for the user-specified input to the ABI function being selected.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Call",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "to": "0x1c98ff5d121a6d5afc8135821acb3983e460ef0590919266d620bfc7b9b6f24d",
  "amount": "10000",
  "asset_id": "0xa5149ac6064222922eaa226526b0d853e7871e28c368f6afbcfd60a6ef8d6e61",
  "gas": "500",
  "param1": "0x28f5c28f5c28f5c",
  "param2": "0x68db8bac710cb",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Log` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#log-receipt)

- `type`: `Log`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `ra`: Decimal string representation of a 64-bit unsigned integer; value of register `$rA`.
- `rb`: Decimal string representation of a 64-bit unsigned integer; value of register `$rB`.
- `rc`: Decimal string representation of a 64-bit unsigned integer; value of register `$rC`.
- `rd`: Decimal string representation of a 64-bit unsigned integer; value of register `$rD`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Log",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "ra": "1844674407370",
  "rb": "1844674407371",
  "rc": "1844674407372",
  "rd": "1844674407373",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Mint` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#mint-receipt)

- `type`: `Mint`.
- `sub_id`: Hexadecimal string representation of the 256-bit (32-byte) asset sub identifier ID; derived from register `$rB`.
- `contract_id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context.
- `val`: Decimal string representation of a 64-bit unsigned integer; value of register `$rA`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Mint",
  "sub_id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "contract_id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "val": "18446744073709551613",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Burn` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#burn-receipt)

- `type`: `Burn`.
- `sub_id`: Hexadecimal string representation of the 256-bit (32-byte) asset sub identifier ID; derived from register `$rB`.
- `contract_id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context.
- `val`: Decimal string representation of a 64-bit unsigned integer; value of register `$rA`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Burn",
  "sub_id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "contract_id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "val": "18446744073709551613",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`LogData` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#logdata-receipt)

- `type`: `LogData`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `ra`: Decimal string representation of a 64-bit unsigned integer; value of register `$rA`
- `rb`: Decimal string representation of a 64-bit unsigned integer; value of register `$rB`
- `ptr`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$rC`.
- `len`: Decimal string representation of a 64-bit unsigned integer; value of register `$rD`.
- `digest`: Hexadecimal string representation of the 256-bit (32-byte) hash of `MEM[$rC, $rD]`.
- `data`: Hexadecimal string representation of the value of the memory range `MEM[$rC, $rD]`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "LogData",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "ra": "1844674407370",
  "rb": "1844674407371",
  "ptr": "0x1ad7f29abcc",
  "len": "66544",
  "digest": "0xd28b78894e493c98a196aa51b432b674e4813253257ed9331054ee8d6813b3aa",
  "pc": "0xffffffffffffffff",
  "data": "0xa7c5ac471b47",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`ReturnData` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#returndata-receipt)

- `type`: `ReturnData`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `ptr`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$rA`.
- `len`: Decimal string representation of a 64-bit unsigned integer; value of register `$rB`.
- `digest`: Hexadecimal string representation of 256-bit (32-byte), hash of `MEM[$rA, $rB]`.
- `data`: Hexadecimal string representation of the value of the memory range `MEM[$rA, $rB]`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "ReturnData",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "ptr": "0x1ad7f29abcc",
  "len": "1844",
  "digest": "0xd28b78894e493c98a196aa51b432b674e4813253257ed9331054ee8d6813b3aa",
  "pc": "0xffffffffffffffff",
  "data": "0xa7c5ac471b47",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Revert` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#revert-receipt)

- `type`: `Revert`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `val`: Decimal string representation of a 64-bit unsigned integer; value of register `$rA`.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Revert",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "val": "1844674407372",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`Transfer` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#transfer-receipt)

- `type`: `Transfer`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `to`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the recipient contract.
- `amount`: Decimal string representation of a 64-bit unsigned integer; amount of coins to forward.
- `asset_id`: Hexadecimal string representation of the 256-bit (32-byte) asset ID of coins to forward.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "Transfer",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "to": "0x1c98ff5d121a6d5afc8135821acb3983e460ef0590919266d620bfc7b9b6f24d",
  "amount": "10000",
  "asset_id": "0xa5149ac6064222922eaa226526b0d853e7871e28c368f6afbcfd60a6ef8d6e61",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`TransferOut` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#transferout-receipt)

- `type`: `TransferOut`.
- `id`: Hexadecimal string representation of the 256-bit (32-byte) contract ID of the current context if in an internal context. `null` otherwise.
- `to`: Hexadecimal string representation of the 256-bit (32-byte) _address_ to transfer coins to.
- `amount`: Decimal string representation of a 64-bit unsigned integer; amount of coins to forward.
- `asset_id`: Hexadecimal string representation of the 256-bit (32-byte) asset ID of coins to forward.
- `pc`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$pc`.
- `is`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$is`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "TransferOut",
  "id": "0x39150017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "to": "0x1c98ff5d121a6d5afc8135821acb3983e460ef0590919266d620bfc7b9b6f24d",
  "amount": "10000",
  "asset_id": "0xa5149ac6064222922eaa226526b0d853e7871e28c368f6afbcfd60a6ef8d6e61",
  "pc": "0xffffffffffffffff",
  "is": "0xfffffffffffffffe"
}
```

_Icon ClipboardText_

## _Icon Link_ [`ScriptResult` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#scriptresult-receipt)

- `type`: `ScriptResult`.
- `result`: Hexadecimal string representation of a 64-bit unsigned integer; `0` if script exited successfully, `any` otherwise.
- `gas_used`: Decimal string representation of a 64-bit unsigned integer; amount of gas consumed by the script.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "ScriptResult",
  "result": "0x00",
  "gas_used": "400"
}
```

_Icon ClipboardText_

## _Icon Link_ [`MessageOut` Receipt](https://docs.fuel.network/docs/specs/abi/receipts/\#messageout-receipt)

- `type`: `MessageOut`.
- `sender`: Hexadecimal string representation of the 256-bit (32-byte) address of the message sender: `MEM[$fp, 32]`.
- `recipient`: Hexadecimal string representation of the 256-bit (32-byte) address of the message recipient: `MEM[$rA, 32]`.
- `amount`: Hexadecimal string representation of a 64-bit unsigned integer; value of register `$rD`.
- `nonce`: Hexadecimal string representation of the 256-bit (32-byte) message nonce as described [here](https://docs.fuel.network/docs/specs/identifiers/utxo-id/#message-nonce).
- `len`: Decimal string representation of a 16-bit unsigned integer; value of register `$rC`.
- `digest`: Hexadecimal string representation of 256-bit (32-byte), hash of `MEM[$rB, $rC]`.
- `data`: Hexadecimal string representation of the value of the memory range `MEM[$rB, $rC]`.

```fuel_Box fuel_Box-idXKMmm-css
{
  "type": "MessageOut",
  "sender": "0x38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff05139150017c9e",
  "recipient": "0x4710162c2e3a95a6faff05139150017c9e38e5e280432d546fae345d6ce6d8fe",
  "amount": "0xe6d8fe4710162c2e",
  "nonce": "0x47101017c9e38e5e280432d546fae345d6ce6d8fe4710162c2e3a95a6faff051",
  "len": "65535",
  "digest": "0xd28b78894e493c98a196aa51b432b674e4813253257ed9331054ee8d6813b3aa",
  "data": "0xa7c5ac471b47"
}
```

_Icon ClipboardText_