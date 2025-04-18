# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_abis/contract_with_type_aliases_abi/src/main.sw

```sway
library;

use std::hash::*;

pub type IdentityAlias = Identity;

pub struct IdentityAliasWrapper {
    pub i: IdentityAlias,
}

pub type Array = [IdentityAlias; 2];
impl PartialEq for Array {
    fn eq(self, other: Self) -> bool {
        self[0] == other[0] && self[1] == other[1]
    }
}
impl Eq for Array {}

pub type Tuple = (SubId, SubId);
impl PartialEq for Tuple {
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}
impl Eq for Tuple {}

pub type StringTy = str[9];
impl PartialEq for StringTy {
    fn eq(self, other: Self) -> bool {
        sha256_str_array(self) == sha256_str_array(other)
    }
}
impl Eq for StringTy {}

pub type IdentityAliasWrapperAlias = IdentityAliasWrapper;
impl PartialEq for IdentityAliasWrapperAlias {
    fn eq(self, other: Self) -> bool {
        self.i == other.i
    }
}
impl Eq for IdentityAliasWrapperAlias {}

pub struct Generic<T> {
    pub f: T,
}

abi MyContract {
    fn foo(
        x: SubId,
        y: [IdentityAlias; 2],
        z: IdentityAliasWrapperAlias,
        w: Generic<IdentityAliasWrapperAlias>,
        u: (SubId, SubId),
        s: StringTy,
    ) -> (SubId, [IdentityAlias; 2], IdentityAliasWrapperAlias, Generic<IdentityAliasWrapperAlias>, (SubId, SubId), StringTy);
}

```
