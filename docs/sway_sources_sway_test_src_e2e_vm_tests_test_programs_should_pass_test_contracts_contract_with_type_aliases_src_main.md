# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/contract_with_type_aliases/src/main.sw

```sway
contract;

use contract_with_type_aliases_abi::*;

impl MyContract for Contract {
    fn foo(
        x: SubId,
        y: [IdentityAlias; 2],
        z: IdentityAliasWrapperAlias,
        w: Generic<IdentityAliasWrapperAlias>,
        u: (SubId, SubId),
        s: StringTy,
    ) -> (SubId, [IdentityAlias; 2], IdentityAliasWrapperAlias, Generic<IdentityAliasWrapperAlias>, (SubId, SubId), StringTy) {
        (x, y, z, w, u, s)
    }
}

```
