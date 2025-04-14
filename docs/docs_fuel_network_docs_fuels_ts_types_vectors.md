[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

Vectors

## _Icon Link_ [Vectors](https://docs.fuel.network/docs/fuels-ts/types/vectors/\#vectors)

In Sway, a Vector is a dynamic-sized collection of elements of the same type. Vectors can hold arbitrary types, including non-primitive types.

## _Icon Link_ [Working with Vectors in the SDK](https://docs.fuel.network/docs/fuels-ts/types/vectors/\#working-with-vectors-in-the-sdk)

A basic Vector in Sway is similar to a TypeScript Array:

```fuel_Box fuel_Box-idXKMmm-css
// Sway Vec<u8>
const basicU8Vector = [1, 2, 3];
```

_Icon ClipboardText_

Consider the following example of a `EmployeeData` struct in Sway:

```fuel_Box fuel_Box-idXKMmm-css
pub struct EmployeeData {
    name: str[8],
    age: u8,
    salary: u64,
    idHash: b256,
    ratings: [u8; 3],
    isActive: bool,
}
```

_Icon ClipboardText_

Now, let's look at the following contract method. It receives a Vector of the `Transaction` struct type as a parameter and returns the last `Transaction` entry from the Vector:

```fuel_Box fuel_Box-idXKMmm-css
fn echo_last_employee_data(employee_data_vector: Vec<EmployeeData>) -> EmployeeData {
    employee_data_vector.get(employee_data_vector.len() - 1).unwrap()
}
```

_Icon ClipboardText_

The code snippet below demonstrates how to call this Sway contract method, which accepts a `Vec<Transaction>`:

```fuel_Box fuel_Box-idXKMmm-css
const employees: EmployeeDataInput[] = [\
  {\
    name: 'John Doe',\
    age: 30,\
    salary: bn(8000),\
    idHash: getRandomB256(),\
    ratings: [1, 2, 3],\
    isActive: true,\
  },\
  {\
    name: 'Everyman',\
    age: 31,\
    salary: bn(9000),\
    idHash: getRandomB256(),\
    ratings: [5, 6, 7],\
    isActive: true,\
  },\
];
const { value } = await contract.functions
  .echo_last_employee_data(employees)
  .simulate();
```

_Icon ClipboardText_

## _Icon Link_ [Converting Bytecode to Vectors](https://docs.fuel.network/docs/fuels-ts/types/vectors/\#converting-bytecode-to-vectors)

Some functions require you to pass in bytecode to the function. The type of the bytecode parameter is usually `Vec<u8>`, here's an example of how to pass bytecode to a function:

```fuel_Box fuel_Box-idXKMmm-css
fn compute_bytecode_root(bytecode_input: Vec<u8>) -> b256 {
    //simply return a fixed b256 value created from a hexadecimal string from testing purposes
    return 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20;
}
```

_Icon ClipboardText_

To pass bytecode to this function, you can make use of the `arrayify` function to convert the bytecode file contents into a `UInt8Array`, the TS compatible type for Sway's `Vec<u8>` type and pass it the function like so:

```fuel_Box fuel_Box-idXKMmm-css
const bytecodeAsVecU8 = Array.from(arrayify(BytecodeInputFactory.bytecode));

const { waitForResult } = await bytecodeContract.functions
  .compute_bytecode_root(bytecodeAsVecU8)
  .call();

const { value: bytecodeRoot } = await waitForResult();
```

_Icon ClipboardText_