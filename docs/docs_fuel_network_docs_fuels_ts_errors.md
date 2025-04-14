[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

Errors

## _Icon Link_ [Errors](https://docs.fuel.network/docs/fuels-ts/errors/\#errors)

All errors thrown from the SDK are instances of the `FuelError` class which will have an accompanying `ErrorCode`.

## _Icon Link_ [Error Codes](https://docs.fuel.network/docs/fuels-ts/errors/\#error-codes)

Here is a list of the expected error codes the SDK can throw. These error codes are used to help understand the error that has been thrown with potential resolutions.

## _Icon Link_ [`ABI_MAIN_METHOD_MISSING`](https://docs.fuel.network/docs/fuels-ts/errors/\#abi_main_method_missing)

When your ABI does not have a `main` method.

This can be resolved by adding a `main` method to your ABI. This is prevalent in scripts and predicates that must contain a `main` method.

## _Icon Link_ [`ABI_TYPES_AND_VALUES_MISMATCH`](https://docs.fuel.network/docs/fuels-ts/errors/\#abi_types_and_values_mismatch)

When the arguments supplied to the function do not match the minimum required input length.

Check that the arguments supplied to the function match the required type.

## _Icon Link_ [`ACCOUNT_REQUIRED`](https://docs.fuel.network/docs/fuels-ts/errors/\#account_required)

When an [`Account` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html) is required for an operation. This will usually be in the form of a [`Wallet`](https://docs.fuel.network/docs/fuels-ts/wallets/).

It could be caused during the deployments of contracts when an account is required to sign the transaction. This can be resolved by following the deployment guide [here](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/).

## _Icon Link_ [`ASSET_BURN_DETECTED`](https://docs.fuel.network/docs/fuels-ts/errors/\#asset_burn_detected)

When you are trying to send a transaction that will result in an asset burn.

Add relevant coin change outputs to the transaction, or enable asset burn in the transaction request.

## _Icon Link_ [`CONFIG_FILE_NOT_FOUND`](https://docs.fuel.network/docs/fuels-ts/errors/\#config_file_not_found)

When a configuration file is not found. This could either be a `fuels.config.[ts,js,mjs,cjs]` file or a TOML file.

Ensure that the configuration file is present in the root directory of your project.

## _Icon Link_ [`CONFIG_FILE_ALREADY_EXISTS`](https://docs.fuel.network/docs/fuels-ts/errors/\#config_file_already_exists)

When a configuration file already exists in the root directory of your project.

You can not run `fuels init` more than once for a given project. Either remove the existing configuration file or update it.

## _Icon Link_ [`CONVERTING_FAILED`](https://docs.fuel.network/docs/fuels-ts/errors/\#converting_failed)

When converting a big number into an incompatible format.

Ensure that the value you've supplied to the big number is compatible with the value you are converting to.

## _Icon Link_ [`CONTRACT_SIZE_EXCEEDS_LIMIT`](https://docs.fuel.network/docs/fuels-ts/errors/\#contract_size_exceeds_limit)

When the contract size exceeds the maximum contract size limit.

Ensure that the contract size is less than the maximum contract size limit, of 100 KB. This can be validated by checking the bytecode length of the contract.

## _Icon Link_ [`DUPLICATED_POLICY`](https://docs.fuel.network/docs/fuels-ts/errors/\#duplicated_policy)

When there are more than policies with the same type, for a transaction.

Ensure that there are no duplicate (by type) policies for a transaction.

## _Icon Link_ [`ERROR_BUILDING_BLOCK_EXPLORER_URL`](https://docs.fuel.network/docs/fuels-ts/errors/\#error_building_block_explorer_url)

When more than one of the following options is passed: `path`, `address`, `txId`, `blockNumber`.

Check that only one of the above is passed.

## _Icon Link_ [`FUNCTION_NOT_FOUND`](https://docs.fuel.network/docs/fuels-ts/errors/\#function_not_found)

When the function with the given name, signature or selector is not found in the ABI.

Check that the function name, signature or selector is correct and exits on the ABI.

## _Icon Link_ [`FUNDS_TOO_LOW`](https://docs.fuel.network/docs/fuels-ts/errors/\#funds_too_low)

When the funds in the account are lower than the required amount.

Ensure that the account has enough funds to cover the transaction.

## _Icon Link_ [`GAS_LIMIT_TOO_LOW`](https://docs.fuel.network/docs/fuels-ts/errors/\#gas_limit_too_low)

When the gas limit is lower than the minimum gas limit.

Increase the gas limit to be greater than the minimum gas limit.

## _Icon Link_ [`GAS_PRICE_TOO_LOW`](https://docs.fuel.network/docs/fuels-ts/errors/\#gas_price_too_low)

When the gas price is lower than the minimum gas price.

Increase the gas price to be greater than the minimum gas price.

## _Icon Link_ [`HD_WALLET_ERROR`](https://docs.fuel.network/docs/fuels-ts/errors/\#hd_wallet_error)

A hardware wallet will throw for unsupported configurations.

The error message will determine which element of the configuration is incorrect. It could be due to the public or private key or when configuring to/from an extended key.

## _Icon Link_ [`INVALID_CHECKSUM`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_checksum)

Checksum validation failed for the provided mnemonic.

Ensure that the mnemonic is correct.

## _Icon Link_ [`INVALID_CHUNK_SIZE_MULTIPLIER`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_chunk_size_multiplier)

When the chunk size multiplier is not between 0 and 1.

Ensure that the chunk size multiplier is a number that it is between 0 and 1.

## _Icon Link_ [`INVALID_CONFIGURABLE_CONSTANTS`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_configurable_constants)

When the program type either: does _not_ have configurable constants to be set; or the provided configurable constant does not belong to the program type, as defined by its ABI.

Ensure the configurable constants provided are correct and are defined in ABI.

## _Icon Link_ [`INVALID_COMPONENT`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_component)

When an expected component is not found in the ABI or is malformed.

Ensure that you have correctly formed Sway types for [Arrays](https://docs.fuel.network/docs/fuels-ts/types/arrays/) and [Vectors](https://docs.fuel.network/docs/fuels-ts/types/vectors/).

## _Icon Link_ [`INVALID_CREDENTIALS`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_credentials)

When the password provided is incorrect.

Ensure that the password is correct.

## _Icon Link_ [`INVALID_DATA`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_data)

When the value being passed is not considered valid, as defined by the function.

Check the function signature and ensure that the passed value is valid.

## _Icon Link_ [`INVALID_ENTROPY`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_entropy)

When the entropy is not: between 16 and 32 bytes; a multiple of 4.

Ensure that the entropy is between 16 and 32 bytes and a multiple of 4.

## _Icon Link_ [`INVALID_EVM_ADDRESS`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_evm_address)

When the provided EVM address is invalid.

Ensure that the [EVM address](https://docs.fuel.network/docs/fuels-ts/types/evm-address/) is valid.

## _Icon Link_ [`INVALID_INPUT_PARAMETERS`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_input_parameters)

When the provided input parameters are _not_ valid.

The error message will determine which parameter is missing. It could be that the provided program type is not one of the following `contract`, `script`, or `predicate`.

## _Icon Link_ [`INVALID_MNEMONIC`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_mnemonic)

When the supplied mnemonic is invalid.

Check the message for more details. It could be that the mnemonic phrase word length is _not_ one of the following: 12, 15, 18, 21, or 24 lengths.

## _Icon Link_ [`INVALID_PASSWORD`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_password)

When the provided password is incorrect.

Ensure that the password is correct.

## _Icon Link_ [`INVALID_POLICY_TYPE`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_policy_type)

When the supplied policy type is invalid for the given Script.

Check the policy type is defined in `PolicyType`.

## _Icon Link_ [`INVALID_PROVIDER`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_provider)

When unable to connect to the `Provider` or `Network` supplied to a method on the [`Fuel`](https://docs.fuel.network/docs/fuels-ts/wallets/connectors/) class.

Check that the `Provider` or `Network` is supplied correctly.

## _Icon Link_ [`INVALID_PUBLIC_KEY`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_public_key)

When the provided public key is invalid.

Ensure that the public key is valid.

## _Icon Link_ [`INVALID_RECEIPT_TYPE`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_receipt_type)

When the receipt type is invalid.

Check the type is within `ReceiptType`.

## _Icon Link_ [`INVALID_REQUEST`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_request)

When the request to the Fuel node fails, error messages are propagated from the Fuel node.

Check the error message from the Fuel node.

## _Icon Link_ [`INVALID_SEED`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_seed)

When the seed length is not between 16 and 64 bytes.

Ensure that the seed length is between 16 and 64 bytes.

## _Icon Link_ [`INVALID_TRANSACTION_INPUT`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_transaction_input)

When the input type is invalid.

Check the type is within `InputType`.

## _Icon Link_ [`INVALID_TRANSACTION_OUTPUT`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_transaction_output)

When the output type is invalid.

Check the type is within `OutputType`.

## _Icon Link_ [`INVALID_TRANSACTION_STATUS`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_transaction_status)

When the transaction status received from the node is unexpected.

Check the status received is within `TransactionStatus`.

## _Icon Link_ [`UNSUPPORTED_TRANSACTION_TYPE`](https://docs.fuel.network/docs/fuels-ts/errors/\#unsupported_transaction_type)

When the transaction type from the Fuel Node is _not_ supported.

The type is within [`TransactionType` _Icon Link_](https://fuels-ts-docs-api.vercel.app/enums/_fuel_ts_account.TransactionType.html).

## _Icon Link_ [`INVALID_TTL`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_ttl)

When the TTL is less than or equal to zero.

Ensure that the TTL is a number and that the TTL is greater than zero.

## _Icon Link_ [`INVALID_WORD_LIST`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_word_list)

When the word list length is not equal to 2048.

The word list provided to the mnemonic length should be equal to 2048.

## _Icon Link_ [`INVALID_URL`](https://docs.fuel.network/docs/fuels-ts/errors/\#invalid_url)

When the URL provided is invalid.

Ensure that the URL is valid.

## _Icon Link_ [`JSON_ABI_ERROR`](https://docs.fuel.network/docs/fuels-ts/errors/\#json_abi_error)

When an ABI type does not conform to the correct format.

It is usually caused by an incorrect type/s within your program, check our type [docs](https://docs.fuel.network/docs/fuels-ts/types/) here for information on the types we support and their expected format.

## _Icon Link_ [`LOG_TYPE_NOT_FOUND`](https://docs.fuel.network/docs/fuels-ts/errors/\#log_type_not_found)

When the log type ID supplied can not be found in the ABI.

Check that the log type ID is correct and exists in the ABI.

## _Icon Link_ [`MISSING_CONNECTOR`](https://docs.fuel.network/docs/fuels-ts/errors/\#missing_connector)

A connector is missing when it's required for a given operation.

Ensure that a connector has been supplied to the `Account` or `Wallet`.

## _Icon Link_ [`MISSING_PROVIDER`](https://docs.fuel.network/docs/fuels-ts/errors/\#missing_provider)

A provider is missing when it's required for a given operation.

It could be caused by the provider not being set for either an [`Account` _Icon Link_](https://fuels-ts-docs-api.vercel.app/modules/_fuel_ts_account.html) or a [`Wallet`](https://docs.fuel.network/docs/fuels-ts/wallets/) \- use the `connect` method to attach a provider.

## _Icon Link_ [`MISSING_REQUIRED_PARAMETER`](https://docs.fuel.network/docs/fuels-ts/errors/\#missing_required_parameter)

When a required parameter has not been supplied to a given method.

The error message will determine which parameter is missing. This could be caused during type generation when neither `inputs` nor `filepaths` are supplied (at least one is required).

## _Icon Link_ [`NODE_INFO_CACHE_EMPTY`](https://docs.fuel.network/docs/fuels-ts/errors/\#node_info_cache_empty)

When the Fuel Node info cache is empty; This is usually caused by not being connected to the Fuel Node.

Ensure that the provider has connected to a Fuel Node successfully.

## _Icon Link_ [`INSUFFICIENT_FUNDS_OR_MAX_COINS`](https://docs.fuel.network/docs/fuels-ts/errors/\#insufficient_funds_or_max_coins)

This error can occur during a funding operation or when calling the `getResourcesToSpend` method. It indicates one of the following issues:

`Insufficient Balance`: The specified account does not have enough balance to cover the required amount.

`UTXO Limit Exceeded`: Although the account has enough total funds, the funds are spread across too many UTXOs (coins). The blockchain limits how many UTXOs can be used in a single transaction, and exceeding this limit prevents the transaction from being processed.

First, to be sure what the real reason is, you can fetch the [balance](https://docs.fuel.network/docs/fuels-ts/wallets/checking-balances/) of the `assetId` to ensure that the account has enough funds to cover the amount. After knowing the reason, to solve you can:

`For Insufficient Balance`: Acquire additional funds in the required asset to meet the amount needed.

`For UTXO Limit Exceeded`: Combine UTXOs to reduce their number and meet the network's requirements. You can follow [this guide](https://docs.fuel.network/docs/fuels-ts/cookbook/combining-utxos/) to learn how to combine UTXOs effectively.

## _Icon Link_ [`TIMEOUT_EXCEEDED`](https://docs.fuel.network/docs/fuels-ts/errors/\#timeout_exceeded)

When the timeout has been exceeded for a given operation.

Check that you're connected to the network and that the network is stable.

## _Icon Link_ [`TYPE_NOT_FOUND`](https://docs.fuel.network/docs/fuels-ts/errors/\#type_not_found)

When the type with the given type ID is not found in the ABI.

Check that the type ID is correct and exists in the ABI.

## _Icon Link_ [`TYPE_NOT_SUPPORTED`](https://docs.fuel.network/docs/fuels-ts/errors/\#type_not_supported)

When an unexpected type has been detected - the error message will determine which type is incorrect.

Check the type against your ABI and ensure that it is correct. You can find a list of all our types [here](https://docs.fuel.network/docs/fuels-ts/types/).

## _Icon Link_ [`UNSUPPORTED_FUEL_CLIENT_VERSION`](https://docs.fuel.network/docs/fuels-ts/errors/\#unsupported_fuel_client_version)

When the version of the Fuel Node you are targeting is not supported by the client you are accessing it from.

Check the version of the Fuel Node and use a compatible version of the SDK to target it.

## _Icon Link_ [`WALLET_MANAGER_ERROR`](https://docs.fuel.network/docs/fuels-ts/errors/\#wallet_manager_error)

A wallet manager will throw for a multitude of reasons. The error message will determine which element of the configuration is incorrect.

It could be that the passphrase is incorrect and/or the wallet does _not_ exist in the manager.

## _Icon Link_ [`WORKSPACE_NOT_DETECTED`](https://docs.fuel.network/docs/fuels-ts/errors/\#workspace_not_detected)

When the workspace is not detected in the directory indicated in the message.

Ensure that the workspace is present in the directory specified.

## _Icon Link_ [`UNKNOWN`](https://docs.fuel.network/docs/fuels-ts/errors/\#unknown)

In cases where the error hasn't been mapped yet, this code will be used.

If you believe you found a bug, please report the [issue _Icon Link_](https://github.com/FuelLabs/fuels-ts/issues/new/choose) to the team.

## _Icon Link_ [`MAX_INPUTS_EXCEEDED`](https://docs.fuel.network/docs/fuels-ts/errors/\#max_inputs_exceeded)

When the number of transaction inputs exceeds the maximum limit allowed by the blockchain.

## _Icon Link_ [`MAX_OUTPUTS_EXCEEDED`](https://docs.fuel.network/docs/fuels-ts/errors/\#max_outputs_exceeded)

When the number of transaction outputs exceeds the maximum limit allowed by the blockchain.