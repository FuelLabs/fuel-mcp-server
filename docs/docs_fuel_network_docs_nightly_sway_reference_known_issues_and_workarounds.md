[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Reference](https://docs.fuel.network/docs/nightly/sway/reference/) /

Known Issues and Workarounds

## _Icon Link_ [Known Issues and Workarounds](https://docs.fuel.network/docs/nightly/sway/reference/known_issues_and_workarounds/\#known-issues-and-workarounds)

## _Icon Link_ [Known Issues](https://docs.fuel.network/docs/nightly/sway/reference/known_issues_and_workarounds/\#known-issues)

- [#870 _Icon Link_](https://github.com/FuelLabs/sway/issues/870): All `impl` blocks need to be defined before any of the functions they define can be called. This includes sibling functions in the same `impl` declaration, i.e., functions in an `impl` can't call each other yet.

## _Icon Link_ [Missing Features](https://docs.fuel.network/docs/nightly/sway/reference/known_issues_and_workarounds/\#missing-features)

- [#1182 _Icon Link_](https://github.com/FuelLabs/sway/issues/1182) Arrays in a `storage` block are not yet supported. See the [Manual Storage Management](https://docs.fuel.network/docs/nightly/sway/advanced/advanced_storage/#manual-storage-management) section for details on how to use `store` and `get` from the standard library to manage storage slots directly. Note, however, that `StorageMap<K, V>` _does_ support arbitrary types for `K` and `V` without any limitations.

## _Icon Link_ [General](https://docs.fuel.network/docs/nightly/sway/reference/known_issues_and_workarounds/\#general)

- No compiler optimization passes have been implemented yet, therefore bytecode will be more expensive and larger than it would be in production. Note that eventually the optimizer will support zero-cost abstractions, avoiding the need for developers to go down to inline assembly to produce optimal code.