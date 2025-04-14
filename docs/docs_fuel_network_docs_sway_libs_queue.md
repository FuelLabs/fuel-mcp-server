[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

Queue

## _Icon Link_ [Queue Library](https://docs.fuel.network/docs/sway-libs/queue/\#queue-library)

A Queue is a linear structure which follows the First-In-First-Out (FIFO) principle. This means that the elements added first are the ones that get removed first.

For implementation details on the Queue Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/queue/index.html).

## _Icon Link_ [Importing the Queue Library](https://docs.fuel.network/docs/sway-libs/queue/\#importing-the-queue-library)

In order to use the Queue Library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/).

To import the Queue Library to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::queue::*;
```

_Icon ClipboardText_

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/sway-libs/queue/\#basic-functionality)

## _Icon Link_ [Instantiating a New Queue](https://docs.fuel.network/docs/sway-libs/queue/\#instantiating-a-new-queue)

Once the `Queue` has been imported, you can create a new queue instance by calling the `new` function.

```fuel_Box fuel_Box-idXKMmm-css
let mut queue = Queue::new();
```

_Icon ClipboardText_

## _Icon Link_ [Enqueuing elements](https://docs.fuel.network/docs/sway-libs/queue/\#enqueuing-elements)

Adding elements to the `Queue` can be done using the `enqueue` function.

```fuel_Box fuel_Box-idXKMmm-css
// Enqueue an element to the queue
queue.enqueue(10u8);
```

_Icon ClipboardText_

## _Icon Link_ [Dequeuing Elements](https://docs.fuel.network/docs/sway-libs/queue/\#dequeuing-elements)

To remove elements from the `Queue`, the `dequeue` function is used. This function follows the FIFO principle.

```fuel_Box fuel_Box-idXKMmm-css
// Dequeue the first element and unwrap the value
let first_item = queue.dequeue().unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [Fetching the Head Element](https://docs.fuel.network/docs/sway-libs/queue/\#fetching-the-head-element)

To retrieve the element at the head of the `Queue` without removing it, you can use the `peek` function.

```fuel_Box fuel_Box-idXKMmm-css
// Peek at the head of the queue
let head_item = queue.peek();
```

_Icon ClipboardText_

## _Icon Link_ [Checking the Queue's Length](https://docs.fuel.network/docs/sway-libs/queue/\#checking-the-queues-length)

The `is_empty` and `len` functions can be used to check if the queue is empty and to get the number of elements in the queue respectively.

```fuel_Box fuel_Box-idXKMmm-css
// Checks if queue is empty (returns True or False)
let is_queue_empty = queue.is_empty();

// Returns length of queue
let queue_length = queue.len();
```

_Icon ClipboardText_