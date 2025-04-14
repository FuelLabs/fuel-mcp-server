[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

Workspaces

## _Icon Link_ [Workspaces](https://docs.fuel.network/docs/nightly/forc/workspaces/\#workspaces)

A _workspace_ is a collection of one or more packages, namely _workspace members_, that are managed together.

The key points for workspaces are:

- Common `forc` commands available for a single package can also be used for a workspace, like `forc build` or `forc deploy`.
- All packages share a common `Forc.lock` file which resides in the root directory of the workspace.

Workspace manifests are declared within `Forc.toml` files and support the following fields:

- [`members`](https://docs.fuel.network/docs/nightly/forc/workspaces/#the-members-field) \- Packages to include in the workspace.
- [`[patch]`](https://docs.fuel.network/docs/nightly/forc/workspaces/#the-patch-section) \- Defines the patches.

An empty workspace can be created with `forc new --workspace` or `forc init --workspace`.

## _Icon Link_ [The `members` field](https://docs.fuel.network/docs/nightly/forc/workspaces/\#the-members-field)

The `members` field defines which packages are members of the workspace:

```fuel_Box fuel_Box-idXKMmm-css
[workspace]
members = ["member1", "path/to/member2"]
```

_Icon ClipboardText_

The `members` field accepts entries to be given in relative path with respect to the workspace root.
Packages that are located within a workspace directory but are _not_ contained within the `members` set are ignored.

## _Icon Link_ [The `[patch]` section](https://docs.fuel.network/docs/nightly/forc/workspaces/\#the-patch-section)

The `[patch]` section can be used to override any dependency in the workspace dependency graph. The usage is the same with package level `[patch]` section and details can be seen [here](https://docs.fuel.network/docs/nightly/forc/manifest_reference/#the-patch-section).

It is not allowed to declare patch table in member of a workspace if the workspace manifest file contains a patch table.

Example:

```fuel_Box fuel_Box-idXKMmm-css
[workspace]
members = ["member1", "path/to/member2"]


[patch.'https://github.com/fuellabs/sway']
std = { git = "https://github.com/fuellabs/sway", branch = "test" }
```

_Icon ClipboardText_

In the above example each occurrence of `std` as a dependency in the workspace will be changed with `std` from `test` branch of sway repo.

## _Icon Link_ [Some `forc` commands that support workspaces](https://docs.fuel.network/docs/nightly/forc/workspaces/\#some-forc-commands-that-support-workspaces)

- `forc build` \- Builds an entire workspace.
- `forc deploy` \- Builds and deploys all deployable members (i.e, contracts) of the workspace in the correct order.
- `forc run` \- Builds and runs all scripts of the workspace.
- `forc check` \- Checks all members of the workspace.
- `forc update` \- Checks and updates workspace level `Forc.lock` file that is shared between workspace members.
- `forc clean` \- Cleans all output artifacts for each member of the workspace.
- `forc fmt` \- Formats all members of a workspace.