[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Contributing](https://docs.fuel.network/docs/wallet/contributing/) /

Running Locally

## _Icon Link_ [Running locally](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#running-locally)

This is a guide that will show you how you can run this project locally if you want to test or make contributions to our Fuel Wallet SDK.

## _Icon Link_ [Running the project](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#running-the-project)

## _Icon Link_ [Requirements](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#requirements)

This project includes frontend. To begin, install dependencies:

- [Node.js 20.11.0 or latest stable _Icon Link_](https://nodejs.org/en/). We recommend using [nvm _Icon Link_](https://github.com/nvm-sh/nvm) to install.
- [pnpm v9.10.0 or latest stable _Icon Link_](https://pnpm.io/installation/)
- [Docker v0.8.2 or latest stable _Icon Link_](https://docs.docker.com/get-docker/)
- [Docker Compose v2.6.0 or latest stable _Icon Link_](https://docs.docker.com/get-docker/)

## _Icon Link_ [Getting the Repository](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#getting-the-repository)

1. Visit the [Fuel Wallet _Icon Link_](https://github.com/FuelLabs/fuels-wallet) repo and fork the project.
2. Then clone your forked copy to your local machine and get to work.

```fuel_Box fuel_Box-idXKMmm-css
git clone https://github.com/FuelLabs/fuels-wallet
cd fuels-wallet
```

_Icon ClipboardText_

## _Icon Link_ [Install Dependencies](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#install-dependencies)

```fuel_Box fuel_Box-idXKMmm-css
pnpm install
```

_Icon ClipboardText_

## _Icon Link_ [Setup Environment Variables](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#setup-environment-variables)

```fuel_Box fuel_Box-idXKMmm-css
cp packages/app/.env.example packages/app/.env
```

_Icon ClipboardText_

## _Icon Link_ [Run Local Node](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#run-local-node)

In this step, we are going to;

- launch a local `fuel-core` node;
- launch a local `faucet` API;

Make sure you have docker installed and running, before running the command below

```fuel_Box fuel_Box-idXKMmm-css
pnpm node:up
```

_Icon ClipboardText_

## _Icon Link_ [Run Web App](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#run-web-app)

Start a local development frontend. After running the below command you can open [http://localhost:3000 _Icon Link_](http://localhost:3000/) in your browser to view the frontend.

```fuel_Box fuel_Box-idXKMmm-css
pnpm dev
```

_Icon ClipboardText_

## _Icon Link_ [Project Overview](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#project-overview)

This section has a brief description of each directory. More details can be found inside each package, by clicking on the links.

- [packages/app _Icon Link_](https://github.com/FuelLabs/fuels-wallet/blob/v0.50.2/packages/app/) Frontend Fuel Wallet application
- [packages/config _Icon Link_](https://github.com/FuelLabs/fuels-wallet) Build configurations

## _Icon Link_ [Useful Scripts](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#useful-scripts)

To make life easier we added as many useful scripts as possible to our [`package.json` _Icon Link_](https://github.com/FuelLabs/fuels-wallet/blob/v0.50.2/package.json). These are some of the most used during development:

```fuel_Box fuel_Box-idXKMmm-css
pnpm <command name>
```

_Icon ClipboardText_

| Script | Description |
| --- | --- |
| `dev` | Run development server for the web app [packages/app _Icon Link_](https://github.com/FuelLabs/fuels-wallet/blob/v0.50.2/packages/app/) |
| `dev:storybook` | Run storybook, which is the place we use to develop our components. |
| `test` | Run all units tests that are based on Jest. |
| `test:e2e` | Run all E2E tests that are based on Cypress. |

> _Icon InfoCircle_
>
> Other scripts can be found in [`package.json` _Icon Link_](https://github.com/FuelLabs/fuels-wallet/blob/v0.50.2/package.json).

## _Icon Link_ [Running Tests](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#running-tests)

Please make sure you have done these steps first:

- [Getting the Repository](https://docs.fuel.network/docs/wallet/contributing/running-locally/#getting-the-repository)
- [Install Dependencies](https://docs.fuel.network/docs/wallet/contributing/running-locally/#install-dependencies)
- [Run Local Node](https://docs.fuel.network/docs/wallet/contributing/running-locally/#run-local-node)

## _Icon Link_ [Run Tests in Development Mode](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#run-tests-in-development-mode)

All tests are run against the local node configured in the files `packages/app/.env` (or `packages/app/.env.example` if the file exists).

Before running test, make sure a local test node is running:

```fuel_Box fuel_Box-idXKMmm-css
pnpm node:up
```

_Icon ClipboardText_

Then, to run tests use:

```fuel_Box fuel_Box-idXKMmm-css
pnpm test
```

_Icon ClipboardText_

## _Icon Link_ [Running E2E Tests](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#running-e2e-tests)

To run E2E tests, follow these steps:

## _Icon Link_ [Run Tests E2E in Development Mode](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#run-tests-e2e-in-development-mode)

```fuel_Box fuel_Box-idXKMmm-css
pnpm node:up
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
pnpm dev:crx
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
pnpm test:e2e
```

_Icon ClipboardText_

## _Icon Link_ [Run Tests E2E in CI/TEST env Mode](https://docs.fuel.network/docs/wallet/contributing/running-locally/\#run-tests-e2e-in-citest-env-mode)

```fuel_Box fuel_Box-idXKMmm-css
pnpm node:up
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
NODE_ENV=test pnpm build:app
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
NODE_ENV=test pnpm test:e2e
```

_Icon ClipboardText_