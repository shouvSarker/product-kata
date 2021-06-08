## Kata
Calculates total price of a cart from a schema of base prices.

## Pre-requisites

Node.js version 15.x.x is installed.

## Install and run

Run the following commands to install and run the script:

```
nvm use
yarn install
yarn run-main path/to/carts path/to/basePrices (it uses example base price and cart 4560 if arguments not supplied)
```

## Testing

Tests have been hand-crafted instead of using a framework. To run tests:

```
yarn e2e-test
yarn unit-test
```
