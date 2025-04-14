[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

String

## _Icon Link_ [String](https://docs.fuel.network/docs/nightly/fuels-ts/types/string/\#string)

In Sway, strings are statically-sized, which means you must define the size of the string beforehand. Statically-sized strings are represented using the `str[x]` syntax, where `x` indicates the string's size.
This guide explains how to create and interact with statically-sized strings while using the SDK.

## _Icon Link_ [Creating Statically-Sized Strings](https://docs.fuel.network/docs/nightly/fuels-ts/types/string/\#creating-statically-sized-strings)

```fuel_Box fuel_Box-idXKMmm-css
// Sway str[2]
const stringSize2 = 'st';

// Sway str[8]
const stringSize8 = 'fuel-sdk';
```

_Icon ClipboardText_

## _Icon Link_ [Interacting with Statically-Sized Strings in Contract Methods](https://docs.fuel.network/docs/nightly/fuels-ts/types/string/\#interacting-with-statically-sized-strings-in-contract-methods)

When a contract method accepts and returns a `str[8]`, the corresponding SDK wrapper method will also take and return a string of the same length. You can pass a string to the contract method like this:

```fuel_Box fuel_Box-idXKMmm-css
const { value } = await contract.functions.echo_str_8('fuel-sdk').get();

console.log('value', value);
// 'fuel-sdk'
```

_Icon ClipboardText_

When working with statically-sized strings, ensure that the input and output strings have the correct length to avoid erroneous behavior.

If you pass a string that is either too long or too short for a contract method, the call will fail like this:

```fuel_Box fuel_Box-idXKMmm-css
const longString = 'fuel-sdk-WILL-THROW-ERROR';

try {
  await contract.functions.echo_str_8(longString).call();
} catch (error) {
  console.log('error', error);
  // Value length mismatch during encode
}

const shortString = 'THROWS';

try {
  await contract.functions.echo_str_8(shortString).call();
} catch (error) {
  console.log('error', error);
  // Value length mismatch during encode
}
```

_Icon ClipboardText_