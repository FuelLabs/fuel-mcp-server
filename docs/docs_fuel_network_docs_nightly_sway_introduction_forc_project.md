[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Introduction](https://docs.fuel.network/docs/nightly/sway/introduction/) /

Forc Project

## _Icon Link_ [A Forc Project](https://docs.fuel.network/docs/nightly/sway/introduction/forc_project/\#a-forc-project)

To initialize a new project with Forc, use `forc new`:

```fuel_Box fuel_Box-idXKMmm-css
forc new my-fuel-project
```

_Icon ClipboardText_

Here is the project that Forc has initialized:

```fuel_Box fuel_Box-idXKMmm-css
$ cd my-fuel-project
$ tree .
├── Forc.toml
└── src
    └── main.sw
```

_Icon ClipboardText_

`Forc.toml` is the _manifest file_ (similar to `Cargo.toml` for Cargo or `package.json` for Node), and defines project metadata such as the project name and dependencies.

For additional information on dependency management, see: [here](https://docs.fuel.network/docs/nightly/forc/dependencies/).

```fuel_Box fuel_Box-idXKMmm-css
[project]
authors = ["User"]
entry = "main.sw"
license = "Apache-2.0"
name = "my-fuel-project"

[dependencies]
```

_Icon ClipboardText_

Here are the contents of the only Sway file in the project, and the main entry point, `src/main.sw`:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

_Icon ClipboardText_

The project is a _contract_, one of four different project types. For additional information on different project types, see [here](https://docs.fuel.network/docs/nightly/sway/sway-program-types/).

We now compile our project with `forc build`, passing the flag `--asm final` to view the generated assembly:

```fuel_Box fuel_Box-idXKMmm-css
$ forc build --asm final
...
.program:
ji   i4
noop
DATA_SECTION_OFFSET[0..32]
DATA_SECTION_OFFSET[32..64]
lw   $ds $is 1
add  $$ds $$ds $is
lw   $r0 $fp i73              ; load input function selector
lw   $r1 data_0               ; load fn selector for comparison
eq   $r2 $r0 $r1              ; function selector comparison
jnzi $r2 i12                  ; jump to selected function
movi $$tmp i123               ; special code for mismatched selector
rvrt $$tmp                    ; revert if no selectors matched
ret  $one
.data:
data_0 .word 559005003

  Compiled contract "my-fuel-project".
  Bytecode size is 60 bytes.
```

_Icon ClipboardText_