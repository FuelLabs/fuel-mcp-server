[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Contributing](https://docs.fuel.network/docs/wallet/contributing/) /

Linking Local Dependencies

## _Icon Link_ [Supported dependencies](https://docs.fuel.network/docs/wallet/contributing/linking-deps/\#supported-dependencies)

We support locally link with [`@fuel-ui` _Icon Link_](https://github.com/FuelLabs/fuel-ui) and [@fuel-ts _Icon Link_](https://github.com/FuelLabs/fuels-ts) repositories

## _Icon Link_ [Using local dependencies in wallet project](https://docs.fuel.network/docs/wallet/contributing/linking-deps/\#using-local-dependencies-in-wallet-project)

This will link dependencies within wallet monorepo to your global `pnpm` store, enabling you to use `@fuel-ui` and/or `@fuel-ts` packages via links in your local projects.
This task may be tedious, but you can accomplish it by following these steps:

1. In the root directory of the repositories( `@fuel-ui` and/or `@fuel-ts`):

- Link dependency to global pnpm store:

```fuel_Box fuel_Box-idXKMmm-css
pnpm -r exec pnpm link --global --dir ./
```

_Icon ClipboardText_

- Execute your build and make sure changes will reflect in wallet:

```fuel_Box fuel_Box-idXKMmm-css
pnpm build:packages
```

_Icon ClipboardText_

2. Inside `fuels-wallet` root directory, edit `scripts/deps.sh`.

- If you're enabling link to `@fuel-ui`, enable this configuration:

```fuel_Box fuel_Box-idXKMmm-css
LINK_FUEL_UI=true
```

_Icon ClipboardText_

- If you're enabling link to `@fuel-ts`, enable this configuration:

```fuel_Box fuel_Box-idXKMmm-css
LINK_FUEL_TS=true
```

_Icon ClipboardText_

3. That's it. Now inside `fuels-wallet` root directory, run your dev command as you wish:

```fuel_Box fuel_Box-idXKMmm-css
pnpm dev
pnpm dev:deps
pnpm dev:crx
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note**
>
> This command will:
>
> - Link dependency repos across all wallet monorepo packages, including the root
> - Run dev server with linked dependencies

Done! Now your changes in `@fuel-ui` and/or `@fuel-ts` will reflect in wallet project. Test with a simple `console.log` to make sure it worked.

## _Icon Link_ [Troubleshooting](https://docs.fuel.network/docs/wallet/contributing/linking-deps/\#troubleshooting)

If you're linking for the first time, you might need:

```fuel_Box fuel_Box-idXKMmm-css
  pnpm setup
```

_Icon ClipboardText_

If it still have problems, you might need to setup again (As `pnpm` releases new version, the global folder structure may change)

```fuel_Box fuel_Box-idXKMmm-css
  pnpm setup
```

_Icon ClipboardText_