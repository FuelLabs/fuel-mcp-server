[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

Recipes

## _Icon Link_ [Recipes](https://docs.fuel.network/docs/graphql/recipes/\#recipes)

You can see and test the example queries and mutations below.
Click the "Run" button to run the query above it and see the response.
Click the "TypeScript", "Apollo Client", or "urql" buttons to see code examples.

- [Get an asset balance of an address](https://docs.fuel.network/docs/graphql/recipes/#get-an-asset-balance-of-an-address)
- [List all asset balances of an address](https://docs.fuel.network/docs/graphql/recipes/#list-all-asset-balances-of-an-address)
- [List all transactions from an address](https://docs.fuel.network/docs/graphql/recipes/#list-all-transactions-from-an-address)
- [List the latest transactions](https://docs.fuel.network/docs/graphql/recipes/#list-the-latest-transactions)
- [Get an asset balance of a contract](https://docs.fuel.network/docs/graphql/recipes/#get-an-asset-balance-of-a-contract)
- [List all asset balances of a contract](https://docs.fuel.network/docs/graphql/recipes/#list-all-asset-balances-of-a-contract)
- [List the latest blocks](https://docs.fuel.network/docs/graphql/recipes/#list-the-latest-blocks)
- [Get block information by height](https://docs.fuel.network/docs/graphql/recipes/#get-block-information-by-height)
- [List all messages owned by address](https://docs.fuel.network/docs/graphql/recipes/#list-all-messages-owned-by-address)
- [Dry run a transaction](https://docs.fuel.network/docs/graphql/recipes/#dry-run-a-transaction)
- [Submit a transaction](https://docs.fuel.network/docs/graphql/recipes/#submit-a-transaction)
- [More Examples](https://docs.fuel.network/docs/graphql/recipes/#more-examples)

## _Icon Link_ [Get an asset balance of an address](https://docs.fuel.network/docs/graphql/recipes/\#get-an-asset-balance-of-an-address)

```graphql
query Balance($address: Address, $assetId: AssetId) {
    balance(owner: $address, assetId: $assetId) {
      owner
      amount
      assetId
    }
  }
```

_Icon ClipboardText_

Variables:

```graphql
{
  "address": "0xce9f8d9367fc4671c0ececce7ab603f6f75d1e66082a82ad12ecdc219b308820",
  "assetId": "0x2a0d0ed9d2217ec7f32dcd9a1902ce2a66d68437aeff84e3a3cc8bebee0d2eea"
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const BALANCE_QUERY = `query Balance($address: Address, $assetId: AssetId) {
    balance(owner: $address, assetId: $assetId) {
      owner
      amount
      assetId
    }
  }`;

const BALANCE_ARGS = {
  address: '0xce9f8d9367fc4671c0ececce7ab603f6f75d1e66082a82ad12ecdc219b308820',
  assetId: '0x2a0d0ed9d2217ec7f32dcd9a1902ce2a66d68437aeff84e3a3cc8bebee0d2eea',
};

const getBalance = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: BALANCE_QUERY,
      variables: BALANCE_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('BALANCE:', json.data.balance);
  expect(json.data.balance.amount).toBeTruthy();
};

await getBalance();
```

_Icon ClipboardText_

## _Icon Link_ [List all asset balances of an address](https://docs.fuel.network/docs/graphql/recipes/\#list-all-asset-balances-of-an-address)

```graphql
query Balances($filter: BalanceFilterInput) {
    balances(filter: $filter, first: 5) {
      nodes {
        amount
        assetId
      }
    }
  }
```

_Icon ClipboardText_

Variables:

```graphql
{
  "filter": {
    "owner": "0xce9f8d9367fc4671c0ececce7ab603f6f75d1e66082a82ad12ecdc219b308820"
  }
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const BALANCES_QUERY = `query Balances($filter: BalanceFilterInput) {
    balances(filter: $filter, first: 5) {
      nodes {
        amount
        assetId
      }
    }
  }`;

const BALANCES_ARGS = {
  filter: {
    owner: '0xce9f8d9367fc4671c0ececce7ab603f6f75d1e66082a82ad12ecdc219b308820',
  },
};

const getBalances = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: BALANCES_QUERY,
      variables: BALANCES_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('BALANCES:', json.data.balances);
  expect(json.data.balances.nodes).toBeTruthy();
};

await getBalances();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [List all transactions from an address](https://docs.fuel.network/docs/graphql/recipes/\#list-all-transactions-from-an-address)

```graphql
query Transactions($address: Address) {
  transactionsByOwner(owner: $address, first: 5) {
    nodes {
      id
      inputs {
        __typename
        ... on InputCoin {
          owner
          utxoId
          amount
          assetId
        }
        ... on InputContract {
          utxoId
          contractId
        }
        ... on InputMessage {
          sender
          recipient
          amount
          data
        }
      }
      outputs {
        __typename
        ... on CoinOutput {
          to
          amount
          assetId
        }
        ... on ContractOutput {
          inputIndex
          balanceRoot
          stateRoot
        }
        ... on ChangeOutput {
          to
          amount
          assetId
        }
        ... on VariableOutput {
          to
          amount
          assetId
        }
        ... on ContractCreated {
          contract
          stateRoot
        }
      }
      status {
        __typename
        ... on FailureStatus {
          reason
          programState {
            returnType
          }
        }
      }
    }
  }
}
```

_Icon ClipboardText_

Variables:

```graphql
{
  "address": "0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871"
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const TRANSACTIONS_QUERY = `query Transactions($address: Address) {
  transactionsByOwner(owner: $address, first: 5) {
    nodes {
      id
      inputs {
        __typename
        ... on InputCoin {
          owner
          utxoId
          amount
          assetId
        }
        ... on InputContract {
          utxoId
          contractId
        }
        ... on InputMessage {
          sender
          recipient
          amount
          data
        }
      }
      outputs {
        __typename
        ... on CoinOutput {
          to
          amount
          assetId
        }
        ... on ContractOutput {
          inputIndex
          balanceRoot
          stateRoot
        }
        ... on ChangeOutput {
          to
          amount
          assetId
        }
        ... on VariableOutput {
          to
          amount
          assetId
        }
        ... on ContractCreated {
          contract
          stateRoot
        }
      }
      status {
        __typename
        ... on FailureStatus {
          reason
          programState {
            returnType
          }
        }
      }
    }
  }
}`;

const TRANSACTIONS_ARGS = {
  address: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
};

const getTransactions = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: TRANSACTIONS_QUERY,
      variables: TRANSACTIONS_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('TRANSACTIONS:', json.data.transactionsByOwner);
  expect(Array.isArray(json.data.transactionsByOwner.nodes)).toBeTruthy();
};

await getTransactions();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [List the latest transactions](https://docs.fuel.network/docs/graphql/recipes/\#list-the-latest-transactions)

```graphql
query LatestTransactions {
    transactions(last: 5) {
      nodes {
        id
        inputs {
          __typename
          ... on InputCoin {
            owner
            utxoId
            amount
            assetId
          }
          ... on InputContract {
            utxoId
            contractId
          }
          ... on InputMessage {
            sender
            recipient
            amount
            data
          }
        }
        outputs {
          __typename
          ... on CoinOutput {
            to
            amount
            assetId
          }
          ... on ContractOutput {
            inputIndex
            balanceRoot
            stateRoot
          }
          ... on ChangeOutput {
            to
            amount
            assetId
          }
          ... on VariableOutput {
            to
            amount
            assetId
          }
          ... on ContractCreated {
            contract
            stateRoot
          }
        }
        status {
          __typename
          ... on FailureStatus {
            reason
            programState {
              returnType
            }
          }
        }
      }
    }
  }
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const LATEST_TRANSACTIONS_QUERY = `query LatestTransactions {
    transactions(last: 5) {
      nodes {
        id
        inputs {
          __typename
          ... on InputCoin {
            owner
            utxoId
            amount
            assetId
          }
          ... on InputContract {
            utxoId
            contractId
          }
          ... on InputMessage {
            sender
            recipient
            amount
            data
          }
        }
        outputs {
          __typename
          ... on CoinOutput {
            to
            amount
            assetId
          }
          ... on ContractOutput {
            inputIndex
            balanceRoot
            stateRoot
          }
          ... on ChangeOutput {
            to
            amount
            assetId
          }
          ... on VariableOutput {
            to
            amount
            assetId
          }
          ... on ContractCreated {
            contract
            stateRoot
          }
        }
        status {
          __typename
          ... on FailureStatus {
            reason
            programState {
              returnType
            }
          }
        }
      }
    }
  }`;

const getLatestTransactions = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: LATEST_TRANSACTIONS_QUERY,
    }),
  });
  const json: any = await response.json();
  console.log('TRANSACTIONS:', json.data.transactions);
  expect(json.data.transactions.nodes.length).toBeTruthy();
};

await getLatestTransactions();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Get an asset balance of a contract](https://docs.fuel.network/docs/graphql/recipes/\#get-an-asset-balance-of-a-contract)

```graphql
query ContractBalance($contract: ContractId, $asset: AssetId) {
    contractBalance(contract: $contract, asset: $asset) {
      contract
      amount
      assetId
    }
  }
```

_Icon ClipboardText_

Variables:

```graphql
{
  "contract": "0xf5b08689ada97df7fd2fbd67bee7dea6d219f117c1dc9345245da16fe4e99111",
  "asset": "0x2a0d0ed9d2217ec7f32dcd9a1902ce2a66d68437aeff84e3a3cc8bebee0d2eea"
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const CONTRACT_BALANCE_QUERY = `query ContractBalance($contract: ContractId, $asset: AssetId) {
    contractBalance(contract: $contract, asset: $asset) {
      contract
      amount
      assetId
    }
  }`;

const CONTRACT_BALANCE_ARGS = {
  contract:
    '0xf5b08689ada97df7fd2fbd67bee7dea6d219f117c1dc9345245da16fe4e99111',
  asset: '0x2a0d0ed9d2217ec7f32dcd9a1902ce2a66d68437aeff84e3a3cc8bebee0d2eea',
};

const getContractBalance = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: CONTRACT_BALANCE_QUERY,
      variables: CONTRACT_BALANCE_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('CONTRACT BALANCE:', json.data.contractBalance);
  expect(json.data.contractBalance.amount).toBeTruthy();
};

await getContractBalance();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [List all asset balances of a contract](https://docs.fuel.network/docs/graphql/recipes/\#list-all-asset-balances-of-a-contract)

```graphql
query ContractBalances($filter: ContractBalanceFilterInput!) {
    contractBalances(filter: $filter, first: 5) {
    nodes {
        amount
        assetId
    }
    }
}
```

_Icon ClipboardText_

Variables:

```graphql
{
  "filter": {
    "contract": "0xf5b08689ada97df7fd2fbd67bee7dea6d219f117c1dc9345245da16fe4e99111"
  }
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const CONTRACT_BALANCES_QUERY = `query ContractBalances($filter: ContractBalanceFilterInput!) {
    contractBalances(filter: $filter, first: 5) {
    nodes {
        amount
        assetId
    }
    }
}`;

const CONTRACT_BALANCES_ARGS = {
  filter: {
    contract:
      '0xf5b08689ada97df7fd2fbd67bee7dea6d219f117c1dc9345245da16fe4e99111',
  },
};

const getContractBalances = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: CONTRACT_BALANCES_QUERY,
      variables: CONTRACT_BALANCES_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('CONTRACT BALANCES:', json.data.contractBalances);
  expect(json.data.contractBalances.nodes).toBeTruthy();
};

await getContractBalances();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [List the latest blocks](https://docs.fuel.network/docs/graphql/recipes/\#list-the-latest-blocks)

```graphql
query LatestBlocks {
    blocks(last: 5) {
      nodes {
        id
        transactions {
          id
          inputAssetIds
          inputs {
            __typename
            ... on InputCoin {
              owner
              utxoId
              amount
              assetId
            }
            ... on InputContract {
              utxoId
              contractId
            }
            ... on InputMessage {
              sender
              recipient
              amount
              data
            }
          }
          outputs {
            __typename
            ... on CoinOutput {
              to
              amount
              assetId
            }
            ... on ContractOutput {
              inputIndex
              balanceRoot
              stateRoot
            }
            ... on ChangeOutput {
              to
              amount
              assetId
            }
            ... on VariableOutput {
              to
              amount
              assetId
            }
            ... on ContractCreated {
              contract
              stateRoot
            }
          }
        }
      }
    }
  }
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const LATEST_BLOCKS_QUERY = `query LatestBlocks {
    blocks(last: 5) {
      nodes {
        id
        transactions {
          id
          inputAssetIds
          inputs {
            __typename
            ... on InputCoin {
              owner
              utxoId
              amount
              assetId
            }
            ... on InputContract {
              utxoId
              contractId
            }
            ... on InputMessage {
              sender
              recipient
              amount
              data
            }
          }
          outputs {
            __typename
            ... on CoinOutput {
              to
              amount
              assetId
            }
            ... on ContractOutput {
              inputIndex
              balanceRoot
              stateRoot
            }
            ... on ChangeOutput {
              to
              amount
              assetId
            }
            ... on VariableOutput {
              to
              amount
              assetId
            }
            ... on ContractCreated {
              contract
              stateRoot
            }
          }
        }
      }
    }
  }`;

const getLatestBlocks = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: LATEST_BLOCKS_QUERY,
    }),
  });
  const json: any = await response.json();
  console.log('BLOCKS:', json.data.blocks);
  expect(json.data.blocks.nodes.length).toBeTruthy();
};

await getLatestBlocks();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Get block information by height](https://docs.fuel.network/docs/graphql/recipes/\#get-block-information-by-height)

```graphql
query Block($height: U64) {
    block(height: $height) {
      id
    }
  }
```

_Icon ClipboardText_

Variables:

```graphql
{
  "height": "3412"
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const BLOCK_BY_HEIGHT_QUERY = `query Block($height: U64) {
    block(height: $height) {
      id
    }
  }`;

const BLOCK_BY_HEIGHT_ARGS = {
  height: '3412',
};

const getBlock = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: BLOCK_BY_HEIGHT_QUERY,
      variables: BLOCK_BY_HEIGHT_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('BLOCK:', json.data.block);
  expect(json.data.block.id).toBeTruthy();
};

await getBlock();
```

_Icon ClipboardText_

## _Icon Link_ [List all messages owned by address](https://docs.fuel.network/docs/graphql/recipes/\#list-all-messages-owned-by-address)

```graphql
query MessageInfo($address: Address) {
    messages(owner: $address, first: 5) {
      nodes {
        amount
        sender
        recipient
        nonce
        data
        daHeight
      }
    }
  }
```

_Icon ClipboardText_

Variables:

```graphql
{
  "address": "0xce9f8d9367fc4671c0ececce7ab603f6f75d1e66082a82ad12ecdc219b308820"
}
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

Run

#### _Icon Code_ Code Example:

TypeScriptApollo Clienturql

```fuel_Box fuel_Box-idXKMmm-css
const MESSAGE_INFO_QUERY = `query MessageInfo($address: Address) {
    messages(owner: $address, first: 5) {
      nodes {
        amount
        sender
        recipient
        nonce
        data
        daHeight
      }
    }
  }`;

const MESSAGE_INFO_ARGS = {
  address: '0xce9f8d9367fc4671c0ececce7ab603f6f75d1e66082a82ad12ecdc219b308820',
};

const getMessages = async () => {
  const response = await fetch('https://testnet.fuel.network/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: MESSAGE_INFO_QUERY,
      variables: MESSAGE_INFO_ARGS,
    }),
  });
  const json: any = await response.json();
  console.log('MESSAGES:', json.data.messages);
  expect(json.data.messages.nodes).toBeTruthy();
};

await getMessages();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Dry run a transaction](https://docs.fuel.network/docs/graphql/recipes/\#dry-run-a-transaction)

```fuel_Box fuel_Box-idXKMmm-css
mutation DryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    receiptType
    data
  }
}
```

_Icon ClipboardText_

## _Icon Link_ [Submit a transaction](https://docs.fuel.network/docs/graphql/recipes/\#submit-a-transaction)

```fuel_Box fuel_Box-idXKMmm-css
mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
```

_Icon ClipboardText_

## _Icon Link_ [More Examples](https://docs.fuel.network/docs/graphql/recipes/\#more-examples)

You can find more examples of how we use this API in our GitHub:

[Fuels Typescript SDK _Icon Link_](https://github.com/FuelLabs/fuels-ts/)

[Fuels Rust SDK _Icon Link_](https://github.com/FuelLabs/fuels-rs/)