# Example: sway_sources/sway/test/src/sdk-harness/test_artifacts/evm_test_abi/src/main.sw

```sway
library;

use std::vm::evm::evm_address::EvmAddress;

abi EvmTest {
    fn evm_address_from_literal() -> EvmAddress;
    fn evm_address_from_argument(raw_address: b256) -> EvmAddress;
}

```
