[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Typescript Frontend

## _Icon Link_ [Building the Frontend](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#building-the-frontend)

## _Icon Link_ [Generate contract types](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#generate-contract-types)

In your folder you have a `fuels.config.ts` file, you can use the `fuels build` command to rebuild your contract and generate types.
Running this command will interpret the output ABI JSON from your contract and generate the correct TypeScript definitions.
If you see the folder `sway-store/counter-contract/out` you will be able to see the ABI JSON there.

Inside the `sway-store/src` directory run:

```fuel_Box fuel_Box-idXKMmm-css
npx fuels build
```

_Icon ClipboardText_

A successful process should print and output like the following:

```fuel_Box fuel_Box-idXKMmm-css
Building..
Building Sway programs using built-in 'forc' binary
Generating types..
🎉  Build completed successfully!
```

_Icon ClipboardText_

Now you should be able to find a new folder `sway-store/src/sway-api`.

## _Icon Link_ [Wallet Providers](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#wallet-providers)

In your `main.tsx` file, wrap your `App` component with the `FuelProvider` and `QueryClientProvider` components to enable Fuel's custom React hooks for wallet functionalities.

This is where you can pass in custom wallet connectors to customize which wallets your users can use to connect to your app.

```fuel_Box fuel_Box-idXKMmm-css
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Provider } from "fuels";

import App from "./App.tsx";
import { providerUrl } from "./lib.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

const connectors = defaultConnectors({
  devMode: true,
  burnerWalletConfig: { fuelProvider: Provider.create(providerUrl) },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider theme="dark" fuelConfig={{ connectors }}>
        <App />
        <ToastContainer theme="dark" />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>,
);
```

_Icon ClipboardText_

## _Icon Link_ [Connecting to the contract](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#connecting-to-the-contract)

Next, open the `src/App.tsx` file, and replace the boilerplate code with the template below:

```fuel_Box fuel_Box-idXKMmm-css
import { useState, useMemo } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { TestContract } from "./sway-api";
import AllItems from "./components/AllItems.tsx";
import ListItem from "./components/ListItem.tsx";
import "./App.css";

const CONTRACT_ID =
  "0x797d208d0104131c2ab1f1e09c4914c7aef5b699fb494be864a5c37057076921";

function App() {
  const [active, setActive] = useState<"all-items" | "list-item">("all-items");
  const { isConnected } = useIsConnected();
  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();

  const contract = useMemo(() => {
    if (wallet) {
      const contract = new TestContract(CONTRACT_ID, wallet)
      return contract;
    }
    return null;
  }, [wallet]);

  return (
    <div className="App">
      <header>
        <h1>Sway Marketplace</h1>
      </header>
      <nav>
        <ul>
          <li
            className={active === "all-items" ? "active-tab" : ""}
            onClick={() => setActive("all-items")}
          >
            See All Items
          </li>
          <li
            className={active === "list-item" ? "active-tab" : ""}
            onClick={() => setActive("list-item")}
          >
            List an Item
          </li>
        </ul>
      </nav>
      <div>
        {isConnected ? (
          <div>
            {active === "all-items" && <AllItems contract={contract} />}
            {active === "list-item" && <ListItem contract={contract} />}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                connect();
              }}
            >
              {isConnecting ? "Connecting" : "Connect"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

Collapse_Icon ClipboardText_

At the top of the file, change the `CONTRACT_ID` to the contract ID that you deployed earlier and set as a constant.

```fuel_Box fuel_Box-idXKMmm-css
const CONTRACT_ID =
  "0x797d208d0104131c2ab1f1e09c4914c7aef5b699fb494be864a5c37057076921";
```

_Icon ClipboardText_

React hooks from the `@fuels/react` package are used in order to connect our wallet to the dapp. In the `App` function, we can call these hooks like this:

```fuel_Box fuel_Box-idXKMmm-css
const { isConnected } = useIsConnected();
const { connect, isConnecting } = useConnectUI();
const { wallet } = useWallet();
```

_Icon ClipboardText_

The `wallet` variable from the `useWallet` hook will have the type `FuelWalletLocked`.

You can think of a locked wallet as a user wallet you can't sign transactions for, and an unlocked wallet as a wallet where you have the private key and are able to sign transactions.

```fuel_Box fuel_Box-idXKMmm-css
const { wallet } = useWallet();
```

_Icon ClipboardText_

The `useMemo` hook is used to connect to our contract with the connected wallet.

```fuel_Box fuel_Box-idXKMmm-css
const contract = useMemo(() => {
  if (wallet) {
    const contract = new TestContract(CONTRACT_ID, wallet)
    return contract;
  }
  return null;
}, [wallet]);
```

_Icon ClipboardText_

## _Icon Link_ [Styling](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#styling)

Copy and paste the CSS code below in your `App.css` file to add some simple styling.

```fuel_Box fuel_Box-idXKMmm-css
.App {
  text-align: center;
}

nav > ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-inline-start: 0;
}

nav > ul > li {
  cursor: pointer;
}

.form-control{
  text-align: left;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
}

.form-control > input {
  margin-bottom: 1rem;
}

.form-control > button {
  cursor: pointer;
  background: #054a9f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 20px;
}

.items-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
}

.item-card{
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-width: 300px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.active-tab{
  border-bottom: 4px solid #77b6d8;
}

button {
  cursor: pointer;
  background: #054a9f;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 20px;
  color: white;
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [UI](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#ui)

In our app we're going to have two tabs: one to see all of the items listed for sale, and one to list a new item for sale.

We use another state variable called `active` that we can use to toggle between our tabs. We can set the default tab to show all listed items.

```fuel_Box fuel_Box-idXKMmm-css
const [active, setActive] = useState<"all-items" | "list-item">("all-items");
```

_Icon ClipboardText_

Next we can create our components to show and list items.

## _Icon Link_ [Listing an Item](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#listing-an-item)

Inside `components`, create a file inside called `ListItem.tsx`.

```fuel_Box fuel_Box-idXKMmm-css
touch ListItem.tsx
```

_Icon ClipboardText_

At the top of the file, import the `useState` hook from `react`, the generated contract ABI from the `contracts` folder, and `bn` (big number) type from `fuels`.

```fuel_Box fuel_Box-idXKMmm-css
import { useState } from "react";
import { TestContract } from "../sway-api";
import { bn } from "fuels";
```

_Icon ClipboardText_

This component will take the contract we made in `App.tsx` as a prop, so let's create an interface for the component.

```fuel_Box fuel_Box-idXKMmm-css
interface ListItemsProps {
  contract: TestContract | null;
}
```

_Icon ClipboardText_

We can set up the template for the function like this.

```fuel_Box fuel_Box-idXKMmm-css
export default function ListItem({contract}: ListItemsProps){
```

_Icon ClipboardText_

To list an item, we'll create a form where the user can input the metadata string and price for the item they want to list.
Let's start by adding some state variables for the `metadata` and `price`. We can also add a `status` variable to track the submit status.

```fuel_Box fuel_Box-idXKMmm-css
const [metadata, setMetadata] = useState<string>("");
const [price, setPrice] = useState<string>("0");
const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
```

_Icon ClipboardText_

We need to add the `handleSubmit` function.
We can use the contract prop to call the `list_item` function and pass in the `price` and `metadata` from the form.

```fuel_Box fuel_Box-idXKMmm-css
async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus('loading')
    if(contract !== null){
        try {
            const priceInput = bn.parseUnits(price.toString());
            await contract.functions
            .list_item(priceInput, metadata)
            .txParams({
                gasLimit: 300_000,
            })
            .call();
            setStatus('success')
        } catch (e) {
            console.log("ERROR:", e);
            setStatus('error')
        }
    } else {
        console.log("ERROR: Contract is null");
    }
}
```

_Icon ClipboardText_

Under the heading, add the code below for the form:

```fuel_Box fuel_Box-idXKMmm-css
return (
        <div>
            <h2>List an Item</h2>
            {status === 'none' &&
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="metadata">Item Metadata:</label>
                    <input
                        id="metadata"
                        type="text"
                        pattern="\w{20}"
                        title="The metatdata must be 20 characters"
                        required
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="price">Item Price:</label>
                    <input
                        id="price"
                        type="number"
                        required
                        min="0"
                        step="any"
                        inputMode="decimal"
                        placeholder="0.00"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                </div>

                <div className="form-control">
                    <button type="submit">List item</button>
                </div>
            </form>
            }

            {status === 'success' && <div>Item successfully listed!</div>}
            {status === 'error' && <div>Error listing item. Please try again.</div>}
            {status === 'loading' && <div>Listing item...</div>}

        </div>
    )
}
```

Collapse_Icon ClipboardText_

Now, try listing an item to make sure this works.
You should see the message `Item successfully listed!`.

## _Icon Link_ [Show All Items](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#show-all-items)

Next, let's create a new file called `AllItems.tsx` in the `components` folder.

```fuel_Box fuel_Box-idXKMmm-css
touch AllItems.tsx
```

_Icon ClipboardText_

Copy and paste the template code below for this component:

```fuel_Box fuel_Box-idXKMmm-css
import { useState, useEffect } from "react";
import { TestContract } from "../sway-api";
import ItemCard from "./ItemCard";
import { BN } from "fuels";
import { ItemOutput } from "../sway-api/contracts/TestContract";

interface AllItemsProps {
  contract: TestContract | null;
}

export default function AllItems({ contract }: AllItemsProps) {
```

_Icon ClipboardText_

Here we can get the item count to see how many items are listed, and then loop through each of them to get the item details.

First, let's create some state variables to store the number of items listed, an array of the item details, and the loading status.

```fuel_Box fuel_Box-idXKMmm-css
const [items, setItems] = useState<ItemOutput[]>([]);
const [itemCount, setItemCount] = useState<number>(0);
const [status, setStatus] = useState<"success" | "loading" | "error">(
  "loading"
);
```

_Icon ClipboardText_

Next, let's fetch the items in a `useEffect` hook.
Because these are read-only functions, we can simulate a dry-run of the transaction by using the `get` method instead of `call` so the user doesn't have to sign anything.

```fuel_Box fuel_Box-idXKMmm-css
useEffect(() => {
  async function getAllItems() {
    if (contract !== null) {
      try {
        let { value } = await contract.functions
          .get_count()
          .txParams({
            gasLimit: 100_000,
          })
          .get();
        let formattedValue = new BN(value).toNumber();
        setItemCount(formattedValue);
        let max = formattedValue + 1;
        let tempItems = [];
        for (let i = 1; i < max; i++) {
          let resp = await contract.functions
            .get_item(i)
            .txParams({
              gasLimit: 100_000,
            })
            .get();
          tempItems.push(resp.value);
        }
        setItems(tempItems);
        setStatus("success");
      } catch (e) {
        setStatus("error");
        console.log("ERROR:", e);
      }
    }
  }
  getAllItems();
}, [contract]);
```

Collapse_Icon ClipboardText_

If the item count is greater than `0` and we are able to successfully load the items, we can map through them and display an item card.

The item card will show the item details and a buy button to buy that item, so we'll need to pass the contract and the item as props.

```fuel_Box fuel_Box-idXKMmm-css
return (
    <div>
      <h2>All Items</h2>
      {status === "success" && (
        <div>
          {itemCount === 0 ? (
            <div>Uh oh! No items have been listed yet</div>
          ) : (
            <div>
              <div>Total items: {itemCount}</div>
              <div className="items-container">
                {items.map((item) => (
                  <ItemCard
                    key={item.id.format()}
                    contract={contract}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {status === "error" && (
        <div>Something went wrong, try reloading the page.</div>
      )}
      {status === "loading" && <div>Loading...</div>}
    </div>
  );
}
```

_Icon ClipboardText_

## _Icon Link_ [Item Card](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#item-card)

Now let's create the item card component.
Create a new file called `ItemCard.tsx` in the components folder.

```fuel_Box fuel_Box-idXKMmm-css
touch ItemCard.tsx
```

_Icon ClipboardText_

After, copy and paste the template code below.

```fuel_Box fuel_Box-idXKMmm-css
import { useState } from "react";
import { ItemOutput } from "../sway-api/contracts/TestContract";
import { TestContract } from "../sway-api";
import { BN } from 'fuels';

interface ItemCardProps {
  contract: TestContract | null;
  item: ItemOutput;
}

export default function ItemCard({ item, contract }: ItemCardProps) {
```

_Icon ClipboardText_

Add a `status` variable to track the status of the buy button.

```fuel_Box fuel_Box-idXKMmm-css
const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
```

_Icon ClipboardText_

Create a new async function called `handleBuyItem`.
Because this function is payable and transfers coins to the item owner, we'll need to do a couple special things here.

Whenever we call any function that uses the transfer or mint functions in Sway, we have to append the matching number of variable outputs to the call with the `txParams` method. Because the `buy_item` function just transfers assets to the item owner, the number of variable outputs is `1`.

Next, because this function is payable and the user needs to transfer the price of the item, we'll use the `callParams` method to forward the amount. With Fuel you can transfer any type of asset, so we need to specify both the amount and the asset ID.

```fuel_Box fuel_Box-idXKMmm-css
async function handleBuyItem() {
  if (contract !== null) {
    setStatus('loading')
    try {
      const baseAssetId = contract.provider.getBaseAssetId();
      await contract.functions.buy_item(item.id)
      .txParams({
        variableOutputs: 1,
      })
      .callParams({
          forward: [item.price, baseAssetId],
        })
      .call()
      setStatus("success");
    } catch (e) {
      console.log("ERROR:", e);
      setStatus("error");
    }
  }
}
```

_Icon ClipboardText_

Then add the item details and status messages to the card.

```fuel_Box fuel_Box-idXKMmm-css
return (
    <div className="item-card">
      <div>Id: {new BN(item.id).toNumber()}</div>
      <div>Metadata: {item.metadata}</div>
      <div>Price: {new BN(item.price).formatUnits()} ETH</div>
      <h3>Total Bought: {new BN(item.total_bought).toNumber()}</h3>
      {status === 'success' && <div>Purchased ✅</div>}
      {status === 'error' && <div>Something went wrong ❌</div>}
      {status === 'none' &&  <button data-testid={`buy-button-${item.id}`} onClick={handleBuyItem}>Buy Item</button>}
      {status === 'loading' && <div>Buying item..</div>}
    </div>
  );
}
```

_Icon ClipboardText_

Now you should be able to see and buy all of the items listed in your contract.

## _Icon Link_ [Checkpoint](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#checkpoint)

Ensure that all your files are correctly configured by examining the code below. If you require additional assistance, refer to the repository [here _Icon Link_](https://github.com/FuelLabs/intro-to-sway/tree/main/sway-store)

`App.tsx`

```fuel_Box fuel_Box-idXKMmm-css
import { useState, useMemo } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { TestContract } from "./sway-api";
import AllItems from "./components/AllItems.tsx";
import ListItem from "./components/ListItem.tsx";
import "./App.css";

const CONTRACT_ID =
  "0x797d208d0104131c2ab1f1e09c4914c7aef5b699fb494be864a5c37057076921";

function App() {
  const [active, setActive] = useState<"all-items" | "list-item">("all-items");
  const { isConnected } = useIsConnected();
  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();

  const contract = useMemo(() => {
    if (wallet) {
      const contract = new TestContract(CONTRACT_ID, wallet)
      return contract;
    }
    return null;
  }, [wallet]);

  return (
    <div className="App">
      <header>
        <h1>Sway Marketplace</h1>
      </header>
      <nav>
        <ul>
          <li
            className={active === "all-items" ? "active-tab" : ""}
            onClick={() => setActive("all-items")}
          >
            See All Items
          </li>
          <li
            className={active === "list-item" ? "active-tab" : ""}
            onClick={() => setActive("list-item")}
          >
            List an Item
          </li>
        </ul>
      </nav>
      <div>
        {isConnected ? (
          <div>
            {active === "all-items" && <AllItems contract={contract} />}
            {active === "list-item" && <ListItem contract={contract} />}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                connect();
              }}
            >
              {isConnecting ? "Connecting" : "Connect"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

Collapse_Icon ClipboardText_

`AllItems.tsx`

```fuel_Box fuel_Box-idXKMmm-css
import { useState, useEffect } from "react";
import { TestContract } from "../sway-api";
import ItemCard from "./ItemCard";
import { BN } from "fuels";
import { ItemOutput } from "../sway-api/contracts/TestContract";

interface AllItemsProps {
  contract: TestContract | null;
}

export default function AllItems({ contract }: AllItemsProps) {
  const [items, setItems] = useState<ItemOutput[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [status, setStatus] = useState<"success" | "loading" | "error">(
    "loading"
  );
  useEffect(() => {
    async function getAllItems() {
      if (contract !== null) {
        try {
          let { value } = await contract.functions
            .get_count()
            .txParams({
              gasLimit: 100_000,
            })
            .get();
          let formattedValue = new BN(value).toNumber();
          setItemCount(formattedValue);
          let max = formattedValue + 1;
          let tempItems = [];
          for (let i = 1; i < max; i++) {
            let resp = await contract.functions
              .get_item(i)
              .txParams({
                gasLimit: 100_000,
              })
              .get();
            tempItems.push(resp.value);
          }
          setItems(tempItems);
          setStatus("success");
        } catch (e) {
          setStatus("error");
          console.log("ERROR:", e);
        }
      }
    }
    getAllItems();
  }, [contract]);
  return (
    <div>
      <h2>All Items</h2>
      {status === "success" && (
        <div>
          {itemCount === 0 ? (
            <div>Uh oh! No items have been listed yet</div>
          ) : (
            <div>
              <div>Total items: {itemCount}</div>
              <div className="items-container">
                {items.map((item) => (
                  <ItemCard
                    key={item.id.format()}
                    contract={contract}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {status === "error" && (
        <div>Something went wrong, try reloading the page.</div>
      )}
      {status === "loading" && <div>Loading...</div>}
    </div>
  );
}
```

Collapse_Icon ClipboardText_

`ItemCard.tsx`

```fuel_Box fuel_Box-idXKMmm-css
import { useState } from "react";
import { ItemOutput } from "../sway-api/contracts/TestContract";
import { TestContract } from "../sway-api";
import { BN } from 'fuels';

interface ItemCardProps {
  contract: TestContract | null;
  item: ItemOutput;
}

export default function ItemCard({ item, contract }: ItemCardProps) {
  const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
  async function handleBuyItem() {
    if (contract !== null) {
      setStatus('loading')
      try {
        const baseAssetId = contract.provider.getBaseAssetId();
        await contract.functions.buy_item(item.id)
        .txParams({
          variableOutputs: 1,
        })
        .callParams({
            forward: [item.price, baseAssetId],
          })
        .call()
        setStatus("success");
      } catch (e) {
        console.log("ERROR:", e);
        setStatus("error");
      }
    }
  }
  return (
    <div className="item-card">
      <div>Id: {new BN(item.id).toNumber()}</div>
      <div>Metadata: {item.metadata}</div>
      <div>Price: {new BN(item.price).formatUnits()} ETH</div>
      <h3>Total Bought: {new BN(item.total_bought).toNumber()}</h3>
      {status === 'success' && <div>Purchased ✅</div>}
      {status === 'error' && <div>Something went wrong ❌</div>}
      {status === 'none' &&  <button data-testid={`buy-button-${item.id}`} onClick={handleBuyItem}>Buy Item</button>}
      {status === 'loading' && <div>Buying item..</div>}
    </div>
  );
}
```

Collapse_Icon ClipboardText_

`ListItem.tsx`

```fuel_Box fuel_Box-idXKMmm-css
import { useState } from "react";
import { TestContract } from "../sway-api";
import { bn } from "fuels";

interface ListItemsProps {
  contract: TestContract | null;
}

export default function ListItem({contract}: ListItemsProps){
    const [metadata, setMetadata] = useState<string>("");
    const [price, setPrice] = useState<string>("0");
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setStatus('loading')
        if(contract !== null){
            try {
                const priceInput = bn.parseUnits(price.toString());
                await contract.functions
                .list_item(priceInput, metadata)
                .txParams({
                    gasLimit: 300_000,
                })
                .call();
                setStatus('success')
            } catch (e) {
                console.log("ERROR:", e);
                setStatus('error')
            }
        } else {
            console.log("ERROR: Contract is null");
        }
    }
    return (
        <div>
            <h2>List an Item</h2>
            {status === 'none' &&
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="metadata">Item Metadata:</label>
                    <input
                        id="metadata"
                        type="text"
                        pattern="\w{20}"
                        title="The metatdata must be 20 characters"
                        required
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="price">Item Price:</label>
                    <input
                        id="price"
                        type="number"
                        required
                        min="0"
                        step="any"
                        inputMode="decimal"
                        placeholder="0.00"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                </div>

                <div className="form-control">
                    <button type="submit">List item</button>
                </div>
            </form>
            }

            {status === 'success' && <div>Item successfully listed!</div>}
            {status === 'error' && <div>Error listing item. Please try again.</div>}
            {status === 'loading' && <div>Listing item...</div>}

        </div>
    )
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Run your project](https://docs.fuel.network/guides/intro-to-sway/typescript-sdk/\#run-your-project)

Inside the `fuel-project/frontend` directory run:

```fuel_Box fuel_Box-idXKMmm-css
npm start
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.4.48:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

_Icon ClipboardText_

And that's it for the frontend! You just created a whole dapp on Fuel!