[Guides](https://docs.fuel.network/guides/) /

[Installation](https://docs.fuel.network/guides/installation/) /

Codespace

## _Icon Link_ [Github Codespace](https://docs.fuel.network/guides/installation/codespace/\#github-codespace)

## _Icon Link_ [Introduction](https://docs.fuel.network/guides/installation/codespace/\#introduction)

The way to think about [Github Codespaces _Icon Link_](https://github.com/features/codespaces) is essentially VSCode in a browser. It’s a remote development environment that is extremely easy to spin up. While not all VS Code plugins are supported, the Sway LSP plugin is supported and works out of the box.

## _Icon Link_ [How to set up for a new repo](https://docs.fuel.network/guides/installation/codespace/\#how-to-set-up-for-a-new-repo)

1. Create a `devcontainer.json` file. The easiest way is by navigating to the repo and clicking Code → … → Configure dev container



![dev container walkthrough](https://docs.fuel.network/images/dev-container.gif)

2. Edit the file to include the following features:







```fuel_Box fuel_Box-idXKMmm-css
"features": {
       "ghcr.io/devcontainers/features/common-utils:1": {},
       "ghcr.io/FuelLabs/devcontainer-features/fuelup:1.0.1": {},
}
```





_Icon ClipboardText_

3. Add any plugins that you want to be installed for this repo under “customizations”.







```fuel_Box fuel_Box-idXKMmm-css
"customizations": {
       "vscode": {
           "extensions": [\
               "fuellabs.sway-vscode-plugin"\
           ]
       }
}
```





_Icon ClipboardText_





    Here are examples that include the Sway LSP plugin.

    3.1. [`https://github.com/FuelLabs/sway/blob/master/.devcontainer/devcontainer.json` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/.devcontainer/devcontainer.json)

    3.2. [`https://github.com/FuelLabs/quickstart/blob/master/.devcontainer/devcontainer.json` _Icon Link_](https://github.com/FuelLabs/quickstart/blob/master/.devcontainer/devcontainer.json)


## _Icon Link_ [How to start a codespace](https://docs.fuel.network/guides/installation/codespace/\#how-to-start-a-codespace)

1. Navigate to the repo that has Github Codespaces configured.

2. Choose Code → Create codespace on master



![Create codespace walkthrough](https://docs.fuel.network/images/create-codespace.gif)

3. This will open a new tab with your codespace. It can take several minutes to start up.

    3.1. You now have a fully functional remote development environment with the Fuel toolchain installed! You can use `forc` to build and deploy Sway code, or `fuelup` to manage the toolchain version. You also have the Sway LSP plugin with full feature support for Sway, like syntax highlighting, hover docs, go-to definitions, etc.

    3.2. Note: if you are working on a large repository and find the codespace is running slow, you can configure it to use a larger instance by clicking Code → … → change machine type on a running instance, or starting a new instance with Code → … → New with options.


## _Icon Link_ [Pricing & billing](https://docs.fuel.network/guides/installation/codespace/\#pricing--billing)

You will be required to enter billing information, however there is a substantial free tier.

## _Icon Link_ [What's next?](https://docs.fuel.network/guides/installation/codespace/\#whats-next)

Now you are ready to start building with Fuel.

👉 Check out the [counter dapp guide](https://docs.fuel.network/guides/counter-dapp/) to deploy your first smart contract.