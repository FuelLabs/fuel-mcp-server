[Docs](https://docs.fuel.network/) /

[Contributing](https://docs.fuel.network/docs/contributing/) /

Guides

## _Icon Link_ [Guides](https://docs.fuel.network/docs/contributing/guides/\#guides)

All guides can be found in the [`docs/guides` _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master/docs/guides) folder of the `docs-hub` repo.

The guide content is in the [`docs/guides/docs` _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master/docs/guides/docs) folder while the example code is found in the [`docs/guides/examples` _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master/docs/guides/examples) folder.

Note that the some content is pulled in from submodules. To make any changes to the content or code from a submodule, you must make a pull request on the source repo.

## _Icon Link_ [Style Guide](https://docs.fuel.network/docs/contributing/guides/\#style-guide)

See the [Style Guide](https://docs.fuel.network/docs/contributing/style-guide/) for guidance on how to edit or write guides.

## _Icon Link_ [Testing](https://docs.fuel.network/docs/contributing/guides/\#testing)

Some guides are tested with a GitHub workflow that runs on pull requests.
If you are creating a new guide, it is recommended you create a test using the `TestAction` component.

You can run the tests locally with the command below:

```fuel_Box fuel_Box-idXKMmm-css
pnpm test:guides
```

_Icon ClipboardText_

Here is how it works:

Within the guide markdown files, there are `TestAction` components that are used run a Playwright test. The test follows each step in the guide based on these components and checks to see if everything works as expected. You can find the test files inside the `tests` folder.

The `TestAction` component accepts two props:

```fuel_Box fuel_Box-idXKMmm-css
export type TestActionProps = {
  id: string;
  action: Action;
};
```

_Icon ClipboardText_

The `id` must be a unique string id.
The `action` prop contains information about the action to run the in test.

You can find examples for how to use this component in the [`docs/guides/docs` _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master/docs/guides/docs) folder, you can find all of the action options in [`tests/utils/types.ts` _Icon Link_](https://github.com/FuelLabs/docs-hub/blob/master/tests/utils/types.ts).

Refer to the [Playwright docs _Icon Link_](https://playwright.dev/) for information on locators and selecting elements in a test.