import {
  testShowTotalPrice,
  testGetTotalPrice,
  testGetLowestBasePrice,
  testLowestBasePrice,
  testOptionCheck,
} from "./utilities/unitTests";

import { throwTestFailure } from "./utilities/e2e";

// Specify fixture for unit tests.
const inputShowTotalPriceArguments = {
  convertedCart: {
    path: "testCartPath",
    items: [],
  },
  convertedBasePrice: {
    path: "testBasePricepath",
    items: [],
  },
};

const inputGetTotalPricesCarts = [
  {
    productType: "testProduct",
    options: {},
    artistMarkup: 20,
    quantity: 2,
  },
];

const inputGetTotalPricesBasePrices = [
  {
    productType: "testProduct",
    options: {},
    basePrice: 20,
  },
  {
    productType: "testProduct",
    options: {},
    basePrice: 30,
  },
];

const inputLowestBasePriceCarts = {
  productType: "testProduct",
  options: { thing: "thing" },
  artistMarkup: 20,
  quantity: 2,
};

const inputLowestBasePriceBasePrices = [
  {
    productType: "testProduct",
    options: { thing: ["thing"] },
    basePrice: 20,
  },
  {
    productType: "testProductDiffName",
    options: { thing: ["thing"] },
    basePrice: 30,
  },
];

const inputGetLowestBasePriceBasePrices = [
  {
    productType: "testProduct",
    options: { thing: ["thing"] },
    basePrice: 20,
  },
  {
    productType: "testProduct",
    options: { thing: ["thing"] },
    basePrice: 30,
  },
];

const inputOptionCheckCartOptions = { size: "small" };
const inputOptionCheckBasePriceOptions = {
  colour: ["white", "dark"],
  size: ["small", "medium"],
};

// Run and store all test outcomes.
const testResults = [
  testShowTotalPrice(
    inputShowTotalPriceArguments,
    "Total price for cart testCartPath and base price testBasePricepath is: 100"
  ),
  testGetTotalPrice(
    inputGetTotalPricesCarts,
    inputGetTotalPricesBasePrices,
    48
  ),
  testLowestBasePrice(
    inputLowestBasePriceCarts,
    inputLowestBasePriceBasePrices
  ),
  testGetLowestBasePrice(inputGetLowestBasePriceBasePrices),
  testOptionCheck(
    inputOptionCheckCartOptions,
    inputOptionCheckBasePriceOptions,
    true
  ),
];

// Check if all tests passed.
testResults.reduce((acc, curr) => acc && curr)
  ? console.log("All tests have passed!")
  : throwTestFailure("There are test failures. Check logs for details");
