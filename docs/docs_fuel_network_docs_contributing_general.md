[Docs](https://docs.fuel.network/) /

[Contributing](https://docs.fuel.network/docs/contributing/) /

General

## _Icon Link_ [General](https://docs.fuel.network/docs/contributing/general/\#general)

You can find the repository for this website on [GitHub _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master). For instructions on how to run the repository locally, see the [README _Icon Link_](https://github.com/FuelLabs/docs-hub/blob/master/README.md).

## _Icon Link_ [Contribution flow](https://docs.fuel.network/docs/contributing/general/\#contribution-flow)

This is a rough outline of what a contributor's workflow looks like:

- Create a feature branch off of the master branch, which is typically the base for your work.
- Make your changes, and commit your work.
- Run tests and make sure all tests pass.
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
- Complete the contributor agreement on the PR if it is not already completed.
- Your PR will be reviewed and some changes may be requested.
  - Once you've made the requested changes, your PR must be re-reviewed and approved.
  - If the PR becomes out of date, you can use GitHub's 'update branch' button.
  - If there are conflicts, you can merge and resolve them locally. Then push to your PR branch. Any changes to the branch will require a re-review.
- GitHub Actions will automatically test all authorized pull requests.
- Use GitHub to merge the PR once approved.

## _Icon Link_ [Linking issues](https://docs.fuel.network/docs/contributing/general/\#linking-issues)

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

## _Icon Link_ [Reporting Bugs](https://docs.fuel.network/docs/contributing/general/\#reporting-bugs)

If you notice any bugs in the live website, please create a [new issue _Icon Link_](https://github.com/FuelLabs/docs-hub/issues/new) on GitHub with:

- a description of the bug
- step-by-step instructions for how to reproduce the bug