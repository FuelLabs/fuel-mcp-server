# Example: sway_sources/sway/test/src/sdk-harness/test_projects/type_aliases/src/main.sw

```sway
contract;

type IdentityAlias = Identity;

struct IdentityAliasWrapper {
    i: IdentityAlias,
}

type Array = [IdentityAlias; 2];
type Tuple = (SubId, SubId);
type StringTy = str[9];
type IdentityAliasWrapperAlias = IdentityAliasWrapper;
struct Generic<T> {
    f: T,
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
