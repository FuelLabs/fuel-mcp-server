# Example: docs/reference/src/code/operations/contract_calling/contract_interface/src/lib.sw

```sway
library;

abi Vault {
    #[payable]
    fn deposit();
    fn withdraw(amount: u64, asset: ContractId);
}

```
