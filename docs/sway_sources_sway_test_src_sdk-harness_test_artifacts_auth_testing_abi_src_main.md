# Example: sway_sources/sway/test/src/sdk-harness/test_artifacts/auth_testing_abi/src/main.sw

```sway
library;

abi AuthTesting {
    fn is_caller_external() -> bool;
    fn returns_msg_sender(expected_id: ContractId) -> bool;
    fn returns_msg_sender_address(expected_id: Address) -> bool;
    fn returns_caller_addresses() -> Vec<Address>;
}

```
