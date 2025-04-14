[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Reference](https://docs.fuel.network/docs/sway/reference/) /

Contributing to Sway

## _Icon Link_ [Contributing To Sway](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#contributing-to-sway)

Thanks for your interest in contributing to Sway! This document outlines the process for installing and setting up the Sway toolchain for development, as well as some conventions on contributing to Sway.

If you run into any difficulties getting started, you can always ask questions on our [Discourse _Icon Link_](https://forum.fuel.network/).

## _Icon Link_ [Building and setting up a development workspace](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#building-and-setting-up-a-development-workspace)

See the [introduction](https://docs.fuel.network/docs/sway/introduction/) section for instructions on installing and setting up the Sway toolchain.

## _Icon Link_ [Getting the repository](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#getting-the-repository)

1. Visit the [Sway _Icon Link_](https://github.com/FuelLabs/sway) repo and fork the project.
2. Then clone your forked copy to your local machine and get to work.

```fuel_Box fuel_Box-idXKMmm-css
git clone https://github.com/FuelLabs/sway
cd sway
```

_Icon ClipboardText_

## _Icon Link_ [Building and testing](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#building-and-testing)

The following steps will run the sway test suite and ensure that everything is set up correctly.

First, open a new terminal and start `fuel-core` with:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core
```

_Icon ClipboardText_

Then open a second terminal, `cd` into the `sway` repo and run:

```fuel_Box fuel_Box-idXKMmm-css
cargo run --bin test
```

_Icon ClipboardText_

After the test suite runs, you should see:

```fuel_Box fuel_Box-idXKMmm-css
Tests passed.
_n_ tests run (0 skipped)
```

_Icon ClipboardText_

Congratulations! You've now got everything setup and are ready to start making contributions.

## _Icon Link_ [Finding something to work on](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#finding-something-to-work-on)

There are many ways in which you may contribute to the Sway project, some of which involve coding knowledge and some which do not. A few examples include:

- Reporting bugs
- Adding documentation to the Sway book
- Adding new features or bug fixes for which there is already an open issue
- Making feature requests

Check out our [Help Wanted _Icon Link_](https://github.com/FuelLabs/sway/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22), [Sway Book _Icon Link_](https://github.com/FuelLabs/sway/issues?q=is%3Aopen+is%3Aissue+label%3A%22The+Sway+Book%22) or [Good First Issue _Icon Link_](https://github.com/FuelLabs/sway/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) issues to find a suitable task.

If you are planning something big, for example, related to multiple components or changes current behaviors, make sure to open an issue to discuss with us before starting on the implementation.

## _Icon Link_ [Contribution flow](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#contribution-flow)

This is a rough outline of what a contributor's workflow looks like:

- Make sure what you want to contribute is already tracked as an issue.
  - We may discuss the problem and solution in the issue.
- Create a Git branch from where you want to base your work. This is usually master.
- Write code, add test cases, and commit your work.
- Run tests and make sure all tests pass.
- If the PR contains any breaking changes, add the breaking label to your PR.
- Push your changes to a branch in your fork of the repository and submit a pull request.
  - Make sure to mention the issue, which is created at step 1, in the commit message.
- Your PR will be reviewed and some changes may be requested.
  - Once you've made changes, your PR must be re-reviewed and approved.
  - If the PR becomes out of date, you can use GitHub's 'update branch' button.
  - If there are conflicts, you can merge and resolve them locally. Then push to your PR branch.
    Any changes to the branch will require a re-review.
- Our CI system (Github Actions) automatically tests all authorized pull requests.
- Use Github to merge the PR once approved.

Thanks for your contributions!

## _Icon Link_ [Linking issues](https://docs.fuel.network/docs/sway/reference/contributing_to_sway/\#linking-issues)

Pull requests should be linked to at least one issue in the same repo.

If the pull request resolves the relevant issues, and you want GitHub to close these issues automatically after it merged into the default branch, you can use the syntax ( `KEYWORD #ISSUE-NUMBER`) like this:

```fuel_Box fuel_Box-idXKMmm-css
close #123
```

_Icon ClipboardText_

If the pull request links an issue but does not close it, you can use the keyword `ref` like this:

```fuel_Box fuel_Box-idXKMmm-css
ref #456
```

_Icon ClipboardText_

Multiple issues should use full syntax for each issue and separate by a comma, like:

```fuel_Box fuel_Box-idXKMmm-css
close #123, ref #456
```

_Icon ClipboardText_