import {
  testShowTotalPrice,
  testGetTotalPrice,
  testGetLowestBasePrice,
  testLowestBasePrice,
  testOptionCheck,
} from "./utilities/unitTests";

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

testResults.reduce((acc, curr) => acc && curr)
  ? console.log("All tests have passed!")
  : console.log("There are test failures. Check logs for details");
