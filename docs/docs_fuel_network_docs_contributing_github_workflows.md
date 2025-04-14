[Docs](https://docs.fuel.network/) /

[Contributing](https://docs.fuel.network/docs/contributing/) /

GitHub Workflows

## _Icon Link_ [Understanding the GitHub Workflows](https://docs.fuel.network/docs/contributing/github-workflows/\#understanding-the-github-workflows)

The `docs-hub` repo uses GitHub Actions to automate the process of updating the documentation, checking for broken links, and more. This page explains the different workflows and how to fix them if they fail.

## _Icon Link_ [DocSearch Scrap ( `docs-scrapper.yml` )](https://docs.fuel.network/docs/contributing/github-workflows/\#docsearch-scrap-docs-scrapperyml-)

This action updates the Algolia search index by scraping the live [docs.fuel.network _Icon Link_](http://docs.fuel.network/) site. It only runs when a Fuel contributor manually runs it.

## _Icon Link_ [Guides ( `guides.yml` )](https://docs.fuel.network/docs/contributing/github-workflows/\#guides-guidesyml-)

This action runs a spell check on all the guides to catch any mispelled words. It also runs Playwright tests for some of the guides to make sure they work as expected.

The files checked for spelling are configured in `.spellcheck.yml`. This is also where you can configure what types of elements are ignored.

If the spell check test fails:

- look up the word in the question to verify it is a real word and is correctly spelled

- If it is a file name or is code, use backticks to ignore the word.

- If it is a real word that is spelled correctly, or an acronym that is either common or is defined already, add it to `spell-check-custom-words.txt`.

- If possible, rewrite the sentence.

- If it otherwise should be ignored, you can configure the pipeline in `.spellcheck.yml`.


To fix a failed guides test, refer to the [Guides Testing](https://docs.fuel.network/docs/contributing/guides/#testing) section.

## _Icon Link_ [Links ( `links.yml` )](https://docs.fuel.network/docs/contributing/github-workflows/\#links-linksyml-)

This workflow tests the links in the docs-hub to make sure none are broken.

## _Icon Link_ [PR Checks ( `pr.yml` )](https://docs.fuel.network/docs/contributing/github-workflows/\#pr-checks-pryml-)

This workflow checks the name of the pull request, checks to make sure there are no dependency vulnerabilities, and runs a lint check for the markdown files and code.

To fix a failing PR title check, change the name of your PR so it uses the convention below:

```fuel_Box fuel_Box-idXKMmm-css
Available types:
 - feat: A new feature
 - fix: A bug fix
 - docs: Documentation only changes
 - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
 - refactor: A code change that neither fixes a bug nor adds a feature
 - perf: A code change that improves performance
 - test: Adding missing tests or correcting existing tests
 - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
 - ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
 - chore: Other changes that don't modify src or test files
 - revert: Reverts a previous commit
```

_Icon ClipboardText_

To fix a failing audit check:

```fuel_Box fuel_Box-idXKMmm-css
pnpm audit --fix
pnpm install
```

_Icon ClipboardText_

To fix a failing lint check:

```fuel_Box fuel_Box-idXKMmm-css
pnpm lint:fix:all
```

_Icon ClipboardText_

## _Icon Link_ [Update Nightly ( `update-nightly.yml` )](https://docs.fuel.network/docs/contributing/github-workflows/\#update-nightly-update-nightlyyml-)

This workflow runs every day Monday through Friday to update the `nightly` version of the documentation. See the [Versions](https://docs.fuel.network/docs/contributing/versions/) section for more information.