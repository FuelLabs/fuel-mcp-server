[Docs](https://docs.fuel.network/) /

Nightly  /

[Wallet](https://docs.fuel.network/docs/nightly/wallet/) /

[Contributing](https://docs.fuel.network/docs/nightly/wallet/contributing/) /

Guide

## _Icon Link_ [Contributing Guide](https://docs.fuel.network/docs/nightly/wallet/contributing/guide/\#contributing-guide)

Thanks for your interest in contributing to Fuel Wallet! This document outlines the process for installing dependencies and setting up Fuel Wallet for development, as well as some conventions to improve your contributions.

If you run into any difficulties getting started, you can always ask questions on our [Discord _Icon Link_](https://discord.gg/xfpK4Pe).

## _Icon Link_ [Finding Something to Work On](https://docs.fuel.network/docs/nightly/wallet/contributing/guide/\#finding-something-to-work-on)

There are many ways in which you may contribute to the Fuel Wallet project, some of which involve coding knowledge and some which do not. A few examples include:

- Reporting bugs
- Adding new features or bug fixes for which there is already an open issue
- Making feature requests

Check out our [Help Wanted _Icon Link_](https://github.com/FuelLabs/fuels-wallet/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [Good First Issues _Icon Link_](https://github.com/FuelLabs/fuels-wallet/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to find a suitable task.

If you are planning something big, for example, related to multiple components or changes current behaviors, make sure to [open an issue _Icon Link_](https://github.com/FuelLabs/fuels-wallet/issues/new) to discuss with us before starting on the implementation.

## _Icon Link_ [Contribution Flow](https://docs.fuel.network/docs/nightly/wallet/contributing/guide/\#contribution-flow)

This is a rough outline of what a contributor's workflow looks like:

- Make sure what you want to contribute is already tracked as an issue.
  - We may discuss the problem and solution in the issue.
- Create a Git branch from where you want to base your work. This is usually master.
- Write code, add test cases where applicable, and commit your work.
- Run tests and make sure all tests pass.
- Add a `changeset` to your PR.

  - `pnpm changeset` \- follow the prompt and add a description of your change at the end
  - `pnpm changeset:empty` \- if no packages are being bumped
- If the PR contains any breaking changes, add the `breaking` label to your PR.
- Push your changes to a branch in your fork of the repository and submit a pull request.
  - Use one of the following tags in the title of your PR:
    - `feat:` \- A new feature
    - `fix:` \- A bug fix
    - `docs:` \- Documentation only changes
    - `style:` \- Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    - `refactor:` \- A code change that neither fixes a bug nor adds a feature
    - `perf:` \- A code change that improves performance
    - `test:` \- Adding missing tests or correcting existing tests
    - `build:` \- Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    - `ci:` \- Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
    - `chore:` \- Other changes that don't modify `src` or test files
    - `revert:` \- Reverts a previous commit
  - Make sure to mention the issue, which is created at step 1, in the commit message.
- Your PR will be reviewed and some changes may be requested.
  - Once you've made changes, your PR must be re-reviewed and approved.
  - If the PR becomes out of date, you can use GitHub's 'update branch' button.
  - If there are conflicts, you can merge and resolve them locally. Then push to your PR branch.
    Any changes to the branch will require a re-review.
- Our CI system (Github Actions) automatically tests all authorized pull requests.
- Use Github to merge the PR once approved.

Thanks for your contributions!

## _Icon Link_ [Linking Issues](https://docs.fuel.network/docs/nightly/wallet/contributing/guide/\#linking-issues)

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