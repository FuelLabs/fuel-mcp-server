# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/shadowing/shadowed_glob_imports/src/lib.sw

```sway
library;

pub const X1: u64 = 5;
pub const X2: u64 = 5;
pub const X3: u64 = 5;

pub struct MyStruct11 {}
pub enum MyEnum12 {}
pub trait MyTrait13 {}
abi MyAbi14 {}

pub struct MyStruct21 {}
pub enum MyEnum22 {}
pub trait MyTrait23{}
abi MyAbi24{}

pub struct MyStruct31{}
pub enum MyEnum32{}
pub trait MyTrait33{}
abi MyAbi34{}

pub struct MyStruct41{}
pub enum MyEnum42{}
pub trait MyTrait43{}
abi MyAbi44{}

```
