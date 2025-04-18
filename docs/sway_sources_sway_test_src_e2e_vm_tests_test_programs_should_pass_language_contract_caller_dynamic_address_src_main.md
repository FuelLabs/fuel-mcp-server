# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/contract_caller_dynamic_address/src/main.sw

```sway

script;


fn main(addr: b256) -> u64 {
  let caller: ContractCaller<SomeAbi> = abi(SomeAbi, addr);
  // this should revert since we don't have the script data being passed in to the harness
  let _ = caller.baz();
  return 42;
}

abi SomeAbi {
  fn baz() -> u32;
  fn quux() -> u64;
}


```
