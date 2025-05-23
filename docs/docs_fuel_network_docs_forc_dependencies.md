[Docs](https://docs.fuel.network/) /

[Forc](https://docs.fuel.network/docs/forc/) /

Dependencies

## _Icon Link_ [Dependencies](https://docs.fuel.network/docs/forc/dependencies/\#dependencies)

Forc has a dependency management system which can pull packages using git and `ipfs`. This allows users to build and share Forc libraries.

## _Icon Link_ [Adding a dependency](https://docs.fuel.network/docs/forc/dependencies/\#adding-a-dependency)

If your `Forc.toml` doesn't already have a `[dependencies]` table, add one. Below, list the package name alongside its source. Currently, `forc` supports `git`, `ipfs` and `path` sources.

If a `git` source is specified, `forc` will fetch the git repository at the given URL and then search for a `Forc.toml` for a package with the given name anywhere inside the git repository.

The following example adds a library dependency named `custom_lib`. For git dependencies you may optionally specify a `branch`, `tag`, or `rev` (i.e. commit hash) reference.

```fuel_Box fuel_Box-idXKMmm-css
[dependencies]
custom_lib = { git = "https://github.com/FuelLabs/custom_lib", branch = "master" }
# custom_lib = { git = "https://github.com/FuelLabs/custom_lib", tag = "v0.0.1" }
# custom_lib = { git = "https://github.com/FuelLabs/custom_lib", rev = "87f80bdf323e2d64e213895d0a639ad468f4deff" }
```

_Icon ClipboardText_

Depending on a local library using `path`:

```fuel_Box fuel_Box-idXKMmm-css
[dependencies]
custom_lib = { path = "../custom_lib" }
```

_Icon ClipboardText_

For `ipfs` sources, `forc` will fetch the specified `cid` using either a local `ipfs` node or a public gateway. `forc` automatically tries to connect to local `ipfs` node. If it fails, it defaults to using `https://ipfs.io/` as a gateway.

The following example adds a dependency with an `ipfs` source.

```fuel_Box fuel_Box-idXKMmm-css
[dependencies]
custom_lib = { ipfs = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG" }
```

_Icon ClipboardText_

Once the package is added, running `forc build` will automatically download added dependencies.

## _Icon Link_ [Updating dependencies](https://docs.fuel.network/docs/forc/dependencies/\#updating-dependencies)

To update dependencies in your Forc directory you can run `forc update`. For `path` and `ipfs` dependencies this will have no effect. For `git` dependencies with a `branch` reference, this will update the project to use the latest commit for the given branch.