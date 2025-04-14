[Docs](https://docs.fuel.network/) /

Nightly  /

[Node Operator](https://docs.fuel.network/docs/nightly/node-operator/) /

[Fuel Sequencer](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/) /

Mainnet Validator

## _Icon Link_ [Run Sequencer Validator](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#run-sequencer-validator)

## _Icon Link_ [Typical Setup](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#typical-setup)

The validator setup will consist of a Fuel Sequencer, Sidecar, and a connection to an Ethereum Mainnet Node.

![fuel sequencer validator](https://raw.githubusercontent.com/FuelLabs/node-operator/refs/heads/main/assets/fuel-sequencer-validator.png)

## _Icon Link_ [Prerequisites](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#prerequisites)

The guide assumes that Golang is installed in order to run Cosmovisor. We recommend installing version `1.21+`.

## _Icon Link_ [Run an Ethereum Mainnet Full Node](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#run-an-ethereum-mainnet-full-node)

To ensure the highest performance and reliability of the Sequencer infrastructure, **running your own Ethereum Mainnet full node is a requirement**. Avoiding the use of third-party services for Ethereum node operations significantly helps the Sequencer network's liveness. Please note these recommended node configurations:

```fuel_Box fuel_Box-idXKMmm-css
--syncmode=snap
--gcmode=full
```

_Icon ClipboardText_

## _Icon Link_ [Configure the Sequencer](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#configure-the-sequencer)

Obtain binary and genesis from this repository:

- Binary from: [https://github.com/FuelLabs/fuel-sequencer-deployments/releases/tag/seq-mainnet-1.2-improved-sidecar _Icon Link_](https://github.com/FuelLabs/fuel-sequencer-deployments/releases/tag/seq-mainnet-1.2-improved-sidecar)
  - For example:
    - `fuelsequencerd-seq-mainnet-1.2-improved-sidecar-darwin-arm64` for Apple Silicon
    - `fuelsequencerd-seq-mainnet-1.2-improved-sidecar-darwin-amd64` for Linux x64
- Genesis from: [https://github.com/FuelLabs/fuel-sequencer-deployments/blob/main/seq-mainnet-1/genesis.json _Icon Link_](https://github.com/FuelLabs/fuel-sequencer-deployments/blob/main/seq-mainnet-1/genesis.json)

Download the right binary based on your architecture to `$GOPATH/bin/` with the name `fuelsequencerd`:

- `echo $GOPATH` to ensure it exists. If not, `go` might not be installed.
- Make sure that your `GOPATH` is set properly in your `.bashrc` or `.zshrc` file. Run `source ~/.bashrc` or `source ~/.zshrc` to apply the changes.

```fuel_Box fuel_Box-idXKMmm-css
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

_Icon ClipboardText_

- `mkdir $GOPATH/bin/` if the directory does not exist.
- `wget <url/to/binary>` to download the binary, or any equivalent approach. For example:

```fuel_Box fuel_Box-idXKMmm-css
wget https://github.com/FuelLabs/fuel-sequencer-deployments/releases/download/seq-mainnet-1.2-improved-sidecar/fuelsequencerd-seq-mainnet-1.2-improved-sidecar-darwin-arm64
```

_Icon ClipboardText_

- `cp <binary> $GOPATH/bin/fuelsequencerd` to copy the binary to the `GOPATH/bin/` directory.
- `chmod +x $GOPATH/bin/fuelsequencerd` to make the binary executable.
- `fuelsequencerd version` to verify that the binary is working.

Try the binary:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd version  # expect seq-mainnet-1.2-improved-sidecar
```

_Icon ClipboardText_

Initialise the node directory, giving your node a meaningful name:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd init <node-name> --chain-id seq-mainnet-1
```

_Icon ClipboardText_

Copy the downloaded genesis file to `~/.fuelsequencer/config/genesis.json`:

```fuel_Box fuel_Box-idXKMmm-css
cp <path/to/genesis.json> ~/.fuelsequencer/config/genesis.json
```

_Icon ClipboardText_

Configure the node (part 1: `~/.fuelsequencer/config/app.toml`):

- Set `minimum-gas-prices = "10fuel"`.
- Configure `[sidecar]`:

  - Ensure that `enabled = true`.
  - Ensure that `address` is where the Sidecar will run.
- Configure `[api]`:

  - Set `swagger=true` (optional).
  - Set `rpc-max-body-bytes = 1153434` (optional - relevant for public REST).
- Configure `[commitments]`:

  - Set `api-enabled = true` (optional - relevant for public REST).
- Configure `[state-sync]`:

  - Set `snapshot-interval = 1000` (optional - to provide state-sync service).
- Configure:
  - Set `rpc-read-timeout = 10` (optional - relevant for public REST).
  - Set `rpc-write-timeout = 0` (optional - relevant for public REST).

> _Icon InfoCircle_
>
> **WARNING**: leaving the `[commitments]` API accessible to anyone can lead to DoS! It is highly recommended to handle whitelisting or authentication by a reverse proxy like [Traefik _Icon Link_](https://traefik.io/traefik/) for gRPC if the commitments API is enabled.

Configure the node (part 2: `~/.fuelsequencer/config/config.toml`):

- Configure `[p2p]`:

  - Set `persistent_peers = "fc5fd264190e4a78612ec589994646268b81f14e@80.64.208.207:26656"`.
- Configure `[mempool]`:

  - Set `max_tx_bytes = 1258291` (1.2MiB)
  - Set `max_txs_bytes = 23068672` (22MiB)
- Configure `[rpc]`:

  - Set `max_body_bytes = 1153434` (optional - relevant for public RPC).

> _Icon InfoCircle_
>
> Note: Ensuring consistent CometBFT mempool parameters across all network nodes is important to reduce transaction delays. This includes `mempool.size`, `mempool.max_txs_bytes`, and `mempool.max_tx_bytes` in [config.toml _Icon Link_](https://docs.cometbft.com/v0.38/core/configuration) and `minimum-gas-prices` in [app.toml _Icon Link_](https://docs.cosmos.network/main/learn/advanced/config), as pointed out above.

## _Icon Link_ [Install Cosmovisor](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#install-cosmovisor)

To install Cosmovisor, run `go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest`

Set the environment variables:

```fuel_Box fuel_Box-idXKMmm-css
echo "# Setup Cosmovisor" >> ~/.zshrc
echo "export DAEMON_NAME=fuelsequencerd" >> ~/.zshrc
echo "export DAEMON_HOME=$HOME/.fuelsequencer" >> ~/.zshrc
echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=true" >> ~/.zshrc
echo "export DAEMON_LOG_BUFFER_SIZE=512" >> ~/.zshrc
echo "export DAEMON_RESTART_AFTER_UPGRADE=true" >> ~/.zshrc
echo "export UNSAFE_SKIP_BACKUP=true" >> ~/.zshrc
echo "export DAEMON_SHUTDOWN_GRACE=15s" >> ~/.zshrc

# You can check https://docs.cosmos.network/main/tooling/cosmovisor for more configuration options.
```

_Icon ClipboardText_

Apply to your current session: `source ~/.zshrc`

```fuel_Box fuel_Box-idXKMmm-css
echo "# Setup Cosmovisor" >> ~/.bashrc
echo "export DAEMON_NAME=fuelsequencerd" >> ~/.bashrc
echo "export DAEMON_HOME=$HOME/.fuelsequencer" >> ~/.bashrc
echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=true" >> ~/.bashrc
echo "export DAEMON_LOG_BUFFER_SIZE=512" >> ~/.bashrc
echo "export DAEMON_RESTART_AFTER_UPGRADE=true" >> ~/.bashrc
echo "export UNSAFE_SKIP_BACKUP=true" >> ~/.bashrc
echo "export DAEMON_SHUTDOWN_GRACE=15s" >> ~/.bashrc

# You can check https://docs.cosmos.network/main/tooling/cosmovisor for more configuration options.
```

_Icon ClipboardText_

Apply to your current session: `source ~/.bashrc`

You can now test that cosmovisor was installed properly:

```fuel_Box fuel_Box-idXKMmm-css
cosmovisor version
```

_Icon ClipboardText_

Initialise Cosmovisor directories (hint: `whereis fuelsequencerd` for the path):

```fuel_Box fuel_Box-idXKMmm-css
cosmovisor init <path/to/fuelsequencerd>
```

_Icon ClipboardText_

At this point `cosmovisor run` will be the equivalent of running `fuelsequencerd`, however you should _not_ run the node for now.

## _Icon Link_ [Configure State Sync](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#configure-state-sync)

State Sync allows a node to get synced up quickly.

To configure State Sync, you will need to set these values in `~/.fuelsequencer/config/config.toml` under `[statesync]`:

- `enable = true` to enable State Sync
- `rpc_servers = ...`
- `trust_height = ...`
- `trust_hash = ...`

The last three values can be obtained from [the explorer _Icon Link_](https://fuel-seq.simplystaking.xyz/fuel-mainnet/statesync).

You will need to specify at least two comma-separated RPC servers in `rpc_servers`. You can either refer to the list of alternate RPC servers above or use the same one twice.

## _Icon Link_ [Run the Sidecar](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#run-the-sidecar)

At this point you should already be able to run `fuelsequencerd start-sidecar` with the right flags, to run the Sidecar. However, **it is highly recommended to run the Sidecar as a background service**.

It is also very important to ensure that you provide all the necessary flags when running the Sidecar to ensure that it can connect to an Ethereum node and to the Sequencer node, and is also accessible by the Sequencer node. The most important flags are:

- `host`: host for the gRPC server to listen on
- `port`: port for the gRPC server to listen on
- `eth_ws_url`: Ethereum node WebSocket endpoint
- `eth_rpc_url`: Ethereum node RPC endpoint
- `eth_contract_address`: address in hex format of the contract to monitor for logs. This MUST be set to `0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3`.
- `sequencer_grpc_url`: Sequencer node gRPC endpoint

## _Icon Link_ [Linux](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#linux)

On Linux, you can use `systemd` to run the Sequencer in the background. Knowledge of how to use `systemd` is assumed here.

Here's an example service file with some placeholder ( `<...>`) values that must be filled-in:

```fuel_Box fuel_Box-idXKMmm-css
[Unit]
Description=Sidecar
After=network.target

[Service]
Type=simple
User=<USER>
ExecStart=<HOME>/go/bin/fuelsequencerd start-sidecar \
    --host "0.0.0.0" \
    --sequencer_grpc_url "127.0.0.1:9090" \
    --eth_ws_url "<ETHEREUM_NODE_WS>" \
    --eth_rpc_url "<ETHEREUM_NODE_RPC>" \
    --eth_contract_address "0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3"
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```

_Icon ClipboardText_

## _Icon Link_ [Mac](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#mac)

On Mac, you can use `launchd` to run the Sequencer in the background. Knowledge of how to use `launchd` is assumed here.

Here's an example plist file with some placeholder ( `[...]`) values that must be filled-in:

```fuel_Box fuel_Box-idXKMmm-css
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>fuel.sidecar</string>

    <key>ProgramArguments</key>
    <array>
        <string>/Users/[User]/go/bin/fuelsequencerd</string>
        <string>start-sidecar</string>
        <string>--host</string>
        <string>0.0.0.0</string>
        <string>--sequencer_grpc_url</string>
        <string>127.0.0.1:9090</string>
        <string>--eth_ws_url</string>
        <string>[ETHEREUM_NODE_WS]</string>
        <string>--eth_rpc_url</string>
        <string>[ETHEREUM_NODE_RPC]</string>
        <string>--eth_contract_address</string>
        <string>0xBa0e6bF94580D49B5Aaaa54279198D424B23eCC3</string>
    </array>

    <key>UserName</key>
    <string>[User]</string>

    <key>KeepAlive</key>
    <dict>
        <key>SuccessfulExit</key>
        <false/>
    </dict>

    <key>HardResourceLimits</key>
    <dict>
        <key>NumberOfFiles</key>
        <integer>4096</integer>
    </dict>

    <key>StandardOutPath</key>
    <string>/Users/[User]/Library/Logs/fuel-sidecar.out</string>
    <key>StandardErrorPath</key>
    <string>/Users/[User]/Library/Logs/fuel-sidecar.err</string>
</dict>
</plist>
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Run the Sequencer](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#run-the-sequencer)

At this point you should already be able to run `cosmovisor run start` to run the Sequencer. However, **it is highly recommended to run the Sequencer as a background service**.

Some examples are provided below for Linux and Mac. You will need to replicate the environment variables defined when setting up Cosmovisor.

## _Icon Link_ [Linux](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#linux-1)

On Linux, you can use `systemd` to run the Sequencer in the background. Knowledge of how to use `systemd` is assumed here.

Here's an example service file with some placeholder ( `<...>`) values that must be filled-in:

```fuel_Box fuel_Box-idXKMmm-css
[Unit]
Description=Sequencer Node
After=network.target

[Service]
Type=simple
User=<USER>
ExecStart=/home/<USER>/go/bin/cosmovisor run start
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

Environment="DAEMON_NAME=fuelsequencerd"
Environment="DAEMON_HOME=/home/<USER>/.fuelsequencer"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=true"
Environment="DAEMON_LOG_BUFFER_SIZE=512"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="DAEMON_SHUTDOWN_GRACE=15s"

[Install]
WantedBy=multi-user.target
```

_Icon ClipboardText_

## _Icon Link_ [Mac](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#mac-1)

On Mac, you can use `launchd` to run the Sequencer in the background. Knowledge of how to use `launchd` is assumed here.

Here's an example plist file with some placeholder ( `[...]`) values that must be filled-in:

```fuel_Box fuel_Box-idXKMmm-css
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>fuel.sequencer</string>

    <key>ProgramArguments</key>
    <array>
        <string>/Users/[User]/go/bin/cosmovisor</string>
        <string>run</string>
        <string>start</string>
    </array>

    <key>UserName</key>
    <string>[User]</string>

    <key>EnvironmentVariables</key>
    <dict>
        <key>DAEMON_NAME</key>
        <string>fuelsequencerd</string>
        <key>DAEMON_HOME</key>
        <string>/Users/[User]/.fuelsequencer</string>
        <key>DAEMON_ALLOW_DOWNLOAD_BINARIES</key>
        <string>true</string>
        <key>DAEMON_LOG_BUFFER_SIZE</key>
        <string>512</string>
        <key>DAEMON_RESTART_AFTER_UPGRADE</key>
        <string>true</string>
        <key>UNSAFE_SKIP_BACKUP</key>
        <string>true</string>
        <key>DAEMON_SHUTDOWN_GRACE</key>
        <string>15s</string>
    </dict>

    <key>KeepAlive</key>
    <dict>
        <key>SuccessfulExit</key>
        <false/>
    </dict>

    <key>HardResourceLimits</key>
    <dict>
        <key>NumberOfFiles</key>
        <integer>4096</integer>
    </dict>

    <key>StandardOutPath</key>
    <string>/Users/[User]/Library/Logs/fuel-sequencer.out</string>
    <key>StandardErrorPath</key>
    <string>/Users/[User]/Library/Logs/fuel-sequencer.err</string>
</dict>
</plist>
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Creating an Account](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#creating-an-account)

To run a validator, you will need to have a Sequencer account address. Generate an address with a key name:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd keys add <NAME> # for a brand new key

# or

fuelsequencerd keys add <NAME> --recover # to create from a mnemonic
```

_Icon ClipboardText_

This will give you an output with an address (e.g. `fuelsequencer1l7qk9umswg65av0zygyymgx5yg0fx4g0dpp2tl`) and a private mnemonic, if you generated a brand new key. Store the mnemonic safely.

Fuel Sequencer addresses also have an Ethereum-compatible (i.e. hex) format. To generate the hex address corresponding to your Sequencer address, run the following:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd keys parse <ADDRESS>
```

_Icon ClipboardText_

This will give an output in this form:

```fuel_Box fuel_Box-idXKMmm-css
bytes: FF8162F37072354EB1E222084DA0D4221E93550F
human: fuelsequencer
```

_Icon ClipboardText_

Adding the `0x` prefix to the address in the first line gives you your Ethereum-compatible address, used to deposit into and interact with your Sequencer address from Ethereum. In this case, it's `0xFF8162F37072354EB1E222084DA0D4221E93550F`.

## _Icon Link_ [Funding the Account](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#funding-the-account)

Ensure your mainnet Ethereum account (EOA) has sufficient ETH to cover gas fees and FUEL tokens to transfer to your Sequencer account.

## _Icon Link_ [Important Addresses](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#important-addresses)

- [**FUEL Token:** `0x675B68AA4d9c2d3BB3F0397048e62E6B7192079c` _Icon Link_](https://etherscan.io/address/0x675b68aa4d9c2d3bb3f0397048e62e6b7192079c)
- [**Sequencer Interface (Bridge):** `0xca0c6B264f0F9958Ec186eb2EAa208966187D866` _Icon Link_](https://etherscan.io/address/0xca0c6B264f0F9958Ec186eb2EAa208966187D866)

## _Icon Link_ [Token Approval](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#token-approval)

Before proceeding, you must **approve** the Fuel token contract to allow the transfer of tokens.

In the [Fuel Token Etherscan contract UI _Icon Link_](https://etherscan.io/token/0x675b68aa4d9c2d3bb3f0397048e62e6b7192079c#writeProxyContract), use the **`approve (0x095ea7b3)`** function:

- **Spender ( `address`)**: Set this to the **Sequencer Interface (Bridge)** address: [`0xca0c6B264f0F9958Ec186eb2EAa208966187D866` _Icon Link_](https://etherscan.io/address/0xca0c6B264f0F9958Ec186eb2EAa208966187D866).

- **Value ( `uint256`)**: Enter the number of tokens to approve, **including 9 additional decimal places**. For unlimited approval, use:







```fuel_Box fuel_Box-idXKMmm-css
0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
```





_Icon ClipboardText_


![Mainnet Etherscan Approval UI](https://raw.githubusercontent.com/FuelLabs/node-operator/refs/heads/main/assets/mainnet-etherscan-approval-ui.png)

## _Icon Link_ [Bridging Tokens](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#bridging-tokens)

To bridge tokens, connect your Ethereum wallet by clicking **"Connect to Web3"** in the top left. Then, use the **`depositFor (0x36efd6f)`** function to fund your sequencer account.

Transfer your FUEL tokens using the [Sequencer Interface (Bridge)Etherscan UI _Icon Link_](https://etherscan.io/address/0xca0c6B264f0F9958Ec186eb2EAa208966187D866).

![Mainnet Etherscan UI](https://raw.githubusercontent.com/FuelLabs/node-operator/refs/heads/main/assets/mainnet-etherscan-ui.png)

- **Amount ( `uint256`)**: Enter the number of tokens to send, **including 9 additional decimal places**.
- **Recipient address**: Enter the Ethereum-compatible address you generated earlier (e.g., `0xFF8162F37072354EB1E222084DA0D4221E93550F`).

Click **"Write"** to confirm the transaction. The transfer may take **~20 minutes** to process.

## _Icon Link_ [Verifying Funds](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#verifying-funds)

To verify your funds, enter your sequencer account address (i.e. `fuelsequencer1l7qk9umswg65av0zygyymgx5yg0fx4g0dpp2tl`) in the [mainnet block explorer _Icon Link_](https://fuel-seq.simplystaking.xyz/fuel-mainnet/statesync).

![Mainnet Block Explorer](https://raw.githubusercontent.com/FuelLabs/node-operator/refs/heads/main/assets/mainnet-blockexplorer.png)

> _Icon InfoCircle_
>
> **⚠ WARNING:** Always test with a small transfer before bridging FUEL tokens.

## _Icon Link_ [Withdrawals](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#withdrawals)

Withdrawals can be easily initiated through the CLI and will be settled on Ethereum approximately 3 days later, as the commitment and bridge finalizations must be completed first.

Identify the account from which you wish to withdraw. Use the following command to list all previously created account names matching your account address above:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd keys list
```

_Icon ClipboardText_

Example output:

```fuel_Box fuel_Box-idXKMmm-css
address: fuelsequencer1zzu4804kp6m6whzza6r75g7mnme2ahqkjuw4kf
  name: my-mainnet-validator
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Al6W+Ttrscm/8njeMOt79T0BOdphfWGXrDLij+O3g19N"}'
  type: local
```

_Icon ClipboardText_

Verify that this is the correct address and account name from which you wish to withdraw.

To initiate the withdrawal, use the following command where `<eth-destination-address>` is any Ethereum address you wish to withdraw to and `<amount-in-fuel>` is the amount of FUEL you wish to withdraw:

Note: The amount in FUEL must include 9 decimal places.

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd tx bridge withdraw-to-ethereum <eth-destination-address> <amount-in-fuel> \
  --from=<key> \
  --gas-prices=10fuel \
  --gas=auto \
  --gas-adjustment 1.5 \
  --node="https://fuel-rpc.polkachu.com/" \
  --chain-id="seq-mainnet-1"
```

_Icon ClipboardText_

For example:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd tx bridge withdraw-to-ethereum 0xd70080dE4535db4A64798a23619Db64fB28fD079 1fuel \
    --from=my-mainnet-validator \
    --gas-prices=10fuel \
    --gas=auto \
    --gas-adjustment 1.5 \
    --node="https://fuel-rpc.polkachu.com/" \
    --chain-id="seq-mainnet-1"
```

_Icon ClipboardText_

Review the transaction details and confirm the transaction by typing `yes` when prompted:

```fuel_Box fuel_Box-idXKMmm-css
gas estimate: 106942
auth_info:
  fee:
    amount:
    - amount: "1069420"
      denom: fuel
    gas_limit: "106942"
    granter: ""
    payer: ""
  signer_infos: []
  tip: null
body:
  extension_options: []
  memo: ""
  messages:
  - '@type': /fuelsequencer.bridge.v1.MsgWithdrawToEthereum
    amount:
      amount: "1"
      denom: fuel
    from: fuelsequencer1zzu4804kp6m6whzza6r75g7mnme2ahqkjuw4kf
    to: 0xd70080dE4535db4A64798a23619Db64fB28fD079
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]:
```

_Icon ClipboardText_

If the transaction is successful, you will receive a transaction hash, which you can paste and monitor the status of your withdrawal [here _Icon Link_](https://fuel-seq.simplystaking.xyz/fuel-mainnet/):

```fuel_Box fuel_Box-idXKMmm-css
code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: ""
timestamp: ""
tx: null
txhash: AD541CE1DCDBD8638C5DFD3C7AF3A3AAF8B9CD0AF265C3AFD96633CE8FAF4CF4
```

_Icon ClipboardText_

![Block Explorer Withdrawal](https://raw.githubusercontent.com/FuelLabs/node-operator/refs/heads/main/assets/mainnet-blockexplorer-withdrawal.png)

After verifying your withdrawal on the shared sequencer explorer, visit [Simply Staking _Icon Link_](https://stake.simplystaking.com/fuel) and connect your wallet. Navigate to the **Withdrawal** tab on the right to monitor the progress of your withdrawal.

![Simply Staking Withdrawal](https://raw.githubusercontent.com/FuelLabs/node-operator/refs/heads/main/assets/mainnet-simplystaking-withdrawal.png)

Once the 3-day waiting period has passed, the withdrawal will require manual action to pull the funds out.

## _Icon Link_ [Create the Validator](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#create-the-validator)

To create the validator, a prerequisite is to have at least 1FUEL, with enough extra to pay for gas fees. You can check your balance from the explorer.

Once you have FUEL tokens, run the following to create a validator, using the name of the account that you created in the previous steps:

```fuel_Box fuel_Box-idXKMmm-css
fuelsequencerd tx staking create-validator path/to/validator.json \
    --from <NAME> \
    --gas auto \
    --gas-prices 10fuel \
    --gas-adjustment 1.5 \
    --chain-id seq-mainnet-1
```

_Icon ClipboardText_

...where validator.json contains:

```fuel_Box fuel_Box-idXKMmm-css
{
 "pubkey": {"@type":"/cosmos.crypto.ed25519.PubKey","key":"<PUBKEY>"},
 "amount": "1000000000fuel",
 "moniker": "<MONIKER>",
 "identity": "<OPTIONAL-IDENTITY>",
 "website": "<OPTIONAL-WEBSITE>",
 "security": "<OPTIONAL-EMAIL>",
 "details": "<OPTIONAL-DETAILS>",
 "commission-rate": "0.05",
 "commission-max-rate": "<MAX-RATE>",
 "commission-max-change-rate": "<MAX-CHANGE-RATE>",
 "min-self-delegation": "1"
}
```

_Icon ClipboardText_

...where the pubkey can be obtained using `fuelsequencerd tendermint show-validator`.

## _Icon Link_ [What to Expect](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#what-to-expect)

- The Sequencer should show block syncing.
- The Sidecar should show block extraction. Occasionally it also receives requests for events.

## _Icon Link_ [Tendermint KMS](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#tendermint-kms)

If you will be using `tmkms`, make sure that in the config:

- Chain ID is set to `seq-mainnet-1` wherever applicable
- `account_key_prefix = "fuelsequencerpub"`
- `consensus_key_prefix = "fuelsequencervalconspub"`
- `sign_extensions = true`
- `protocol_version = "v0.34"`

## _Icon Link_ [Additional Advanced Configuration](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#additional-advanced-configuration)

Sidecar flags:

- `development`: starts the sidecar in development mode.
- `eth_max_block_range`: max number of Ethereum blocks queried at one go.
- `eth_min_logs_query_interval`: minimum wait between successive queries for logs.
- `unsafe_eth_start_block`: the Ethereum block to start querying from.
- `unsafe_eth_end_block`: the last Ethereum block to query. Incorrect use can cause the validator to propose empty blocks, leading to slashing!
- `sequencer_path_to_cert_file`: path to the certificate file of the Sequencer infrastructure for secure communication. Specify this value if the Sequencer infrastructure was set up using TLS.
- `sidecar_path_to_cert_file`: path to the certificate file of the sidecar server for secure communication. Specify this value if you want to set up a sidecar server with TLS.
- `sidecar_path_to_key_file`: path to the private key file of the sidecar server for secure communication. Specify this value if you want to set up a sidecar server with TLS.
- `prometheus_enabled`: enables serving of prometheus metrics.
- `prometheus_listen_address`: address to listen for prometheus collectors (default ":8081").
- `prometheus_max_open_connections`: max number of simultaneous connections (default 3).
- `prometheus_namespace`: instrumentation namespace (default "sidecar").
- `prometheus_read_header_timeout`: amount of time allowed to read request headers (default 10s).
- `prometheus_write_timeout`: maximum duration before timing out writes of the response (default 10s).

Sidecar client flags:

- `sidecar_grpc_url`: the sidecar's gRPC endpoint.
- `query_timeout`: how long to wait before the request times out.

## _Icon Link_ [References](https://docs.fuel.network/docs/nightly/node-operator/fuel-sequencer/mainnet-validator/\#references)

Based on material from:

- [https://docs.cosmos.network/main/tooling/cosmovisor _Icon Link_](https://docs.cosmos.network/main/tooling/cosmovisor)
- [https://docs.osmosis.zone/overview/validate/joining-mainnet#set-up-cosmovisor _Icon Link_](https://docs.osmosis.zone/overview/validate/joining-mainnet#set-up-cosmovisor)