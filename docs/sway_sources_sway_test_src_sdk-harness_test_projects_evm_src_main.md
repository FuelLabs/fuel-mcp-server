# Example: sway_sources/sway/test/src/sdk-harness/test_projects/evm/src/main.sw

```sway
contract;

use evm_test_abi::EvmTest;
use std::vm::evm::evm_address::EvmAddress;

impl EvmTest for Contract {
    fn evm_address_from_literal() -> EvmAddress {
        EvmAddress::from(0x0606060606060606060606060606060606060606060606060606060606060606)
    }

    fn evm_address_from_argument(raw_address: b256) -> EvmAddress {
        EvmAddress::from(raw_address)
    }
}

```
