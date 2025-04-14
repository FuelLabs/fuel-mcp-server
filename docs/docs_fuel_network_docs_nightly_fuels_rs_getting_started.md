[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

Getting Started

## _Icon Link_ [Getting Started](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#getting-started)

## _Icon Link_ [Installation Guide](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#installation-guide)

Please visit the Fuel [installation guide _Icon Link_](https://docs.fuel.network/guides/installation) to install the Fuel toolchain binaries and prerequisites.

`forc` is Sway equivalent of Rust's `cargo`. `fuel-core` is a Fuel full node implementation.

There are two main ways you can use the Fuel Rust SDK:

1. Creating a new Sway project with `forc` and running the tests
2. Creating a standalone project and importing the `fuels-rs` crate

## _Icon Link_ [Creating a new project with Forc](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#creating-a-new-project-with-forc)

You can create a new Sway project with

```fuel_Box fuel_Box-idXKMmm-css
forc new <Project name>
```

_Icon ClipboardText_

Or you can initialize a project within an existing folder with

```fuel_Box fuel_Box-idXKMmm-css
forc init
```

_Icon ClipboardText_

## _Icon Link_ [Adding a Rust integration test to the Sway project](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#adding-a-rust-integration-test-to-the-sway-project)

Now that we have a new project, we can add a Rust integration test using a `cargo generate` template.
If `cargo generate` is not already installed, you can install it with:

```fuel_Box fuel_Box-idXKMmm-css
cargo install cargo-generate
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** You can learn more about cargo generate by visiting its [repository _Icon Link_](https://github.com/cargo-generate/cargo-generate).

Let's generate the default test harness with the following command:

```fuel_Box fuel_Box-idXKMmm-css
cargo generate --init fuellabs/sway templates/sway-test-rs --name <Project name> --force
```

_Icon ClipboardText_

`--force` forces your `--name` input to retain your desired casing for the `{{project-name}}` placeholder in the template. Otherwise, `cargo-generate` automatically converts it to kebab-case. With `--force`, this means that both `my_fuel_project` and `my-fuel-project` are valid project names, depending on your needs.

Before running test, we need to build the Sway project with:

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

Afterwards, we can run the test with:

```fuel_Box fuel_Box-idXKMmm-css
cargo test
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** If you need to capture output from the tests, use one of the following commands:

```fuel_Box fuel_Box-idXKMmm-css
cargo test -- --nocapture
```

_Icon ClipboardText_

## _Icon Link_ [Importing the Fuel Rust SDK](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#importing-the-fuel-rust-sdk)

Add these dependencies on your `Cargo.toml`:

```fuel_Box fuel_Box-idXKMmm-css
fuels = "0.66.0"
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** We're using version `0.66.0` of the SDK, which is the latest version at the time of this writing.

And then, in your Rust file that's going to make use of the SDK:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;
```

_Icon ClipboardText_

## _Icon Link_ [The Fuel Rust SDK source code](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#the-fuel-rust-sdk-source-code)

Another way to experience the SDK is to look at the source code. The `e2e/tests/` folder is full of integration tests that go through almost all aspects of the SDK.

> _Icon InfoCircle_
>
> **Note** Before running the tests, we need to build all the Sway test projects. The file `packages/fuels/Forc.toml` contains a \`\[workspace\], which members are the paths to all integration tests.
> To build these tests, run the following command:

```fuel_Box fuel_Box-idXKMmm-css
forc build --release --path e2e
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> `forc` can also be used to clean and format the test projects. Check the `help` output for more info.

After building the projects, we can run the tests with

```fuel_Box fuel_Box-idXKMmm-css
cargo test
```

_Icon ClipboardText_

If you need all targets and all features, you can run

```fuel_Box fuel_Box-idXKMmm-css
cargo test --all-targets --all-features
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** If you need to capture output from the tests, you can run

```fuel_Box fuel_Box-idXKMmm-css
cargo test -- --nocapture
```

_Icon ClipboardText_

## _Icon Link_ [More in-depth Fuel and Sway knowledge](https://docs.fuel.network/docs/nightly/fuels-rs/getting-started/\#more-in-depth-fuel-and-sway-knowledge)

Read [The Sway Book _Icon Link_](https://docs.fuel.network/docs/sway/) for more in-depth knowledge about Sway, the official smart contract language for the Fuel Virtual Machine.