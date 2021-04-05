// @ts-ignore
import rewire from "rewire";
import {
  BasePrice,
  BasePriceOptions,
  Cart,
  CartOptions,
  ConvertedJsonInput,
} from "../../types";

const appFunctions = rewire("../../showTotalPrice.ts");

/**
 * Tests whether show total price is logging output accurately.
 *
 * @param inputArguments Input file paths and data.
 * @param expectedOutcome The log message we expect to be displayed.
 * @returns Boolean denoting if the test passed.
 */
export const testShowTotalPrice = (
  inputArguments: ConvertedJsonInput,
  expectedOutcome: string
) => {
  // Storing the console log strings to an array.
  // This will assist us with comparing the logged messages
  // with expected logging.
  var logBackup = console.log;
  var logMessages: any = [];

  console.log = function () {
    logMessages.push.apply(logMessages, arguments);
    // @ts-ignore
    logBackup.apply(console, arguments);
  };

  const showTotalPrice = appFunctions.__get__("showTotalPrice");

  // evaluating the function so that we can mock the functions called from it.
  // Rewire cannot mock a const function.
  // Avoided using other mock packages to keep this lightweight.
  const evaledShowTotalPrice = eval(showTotalPrice.toString());

  // Mocks getTotalPrice by setting the function here.
  // @ts-ignore
  const getTotalPrice = () => 100;

  // evaluating and overriding function
  evaledShowTotalPrice(inputArguments);

  const failOutcome = `${logMessages[0]}` === "";
  const successOutcome = `${logMessages[0]}` === expectedOutcome;

  // Test a fail case just to be sure test passing is legitimate.
  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the show total price test!")
    : console.error("Failed the show total price test!");

  return !failOutcome && successOutcome;
};

/**
 * Tests get total price for a list of carts.
 *
 * @param inputCarts The Carts to get total prices of.
 * @param inputBasePrices The supplied base prices.
 * @param expectedOutcome The total price we expect.
 * @returns Boolean denoting if the test passed.
 */
export const testGetTotalPrice = (
  inputCarts: Cart[],
  inputBasePrices: BasePrice[],
  expectedOutcome: number
) => {
  const getTotalPrice = appFunctions.__get__("getTotalPrice");
  const evaledGetTotalPrice = eval(getTotalPrice.toString());

  // @ts-ignore
  const lowestBasePrice = () => ({
    productType: "testProduct",
    options: {},
    basePrice: 20,
  });

  const outcome = evaledGetTotalPrice(inputCarts, inputBasePrices);
  const failOutcome = outcome === expectedOutcome * 4; // Generating a failed case.
  const successOutcome = outcome === expectedOutcome;

  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the get total price test!")
    : console.error("Failed the get total price test!");

  return !failOutcome && successOutcome;
};

/**
 * Tests getting lowest base price for a cart.
 *
 * @param inputCarts The carts to get bas price for.
 * @param inputBasePrices The supplied base price.
 * @returns Boolean denoting if the test passed.
 */
export const testLowestBasePrice = (
  inputCarts: Cart,
  inputBasePrices: BasePrice[]
) => {
  const lowestBasePrice = appFunctions.__get__("lowestBasePrice");
  const evaledLowestBasePrice = eval(lowestBasePrice.toString());

  // Mocks the other functions called in this function.
  // @ts-ignore
  const getLowestBasePrice = (arg) => arg; // Return supplied argument.
  // @ts-ignore
  const optionCheck = () => true;

  const outcome = evaledLowestBasePrice(inputCarts, inputBasePrices);
  const failOutcome = JSON.stringify(outcome) === "";
  const successOutcome =
    JSON.stringify(outcome) === JSON.stringify([inputBasePrices[0]]);

  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the lowest base price test!")
    : console.error("Failed the lowest base price test!");

  return !failOutcome && successOutcome;
};

/**
 * Tests getting lowest base price from a list of base prices.
 *
 * @param inputBasePrices The supplied list of base prices.
 * @returns Boolean denoting if the test passed.
 */
export const testGetLowestBasePrice = (inputBasePrices: BasePrice[]) => {
  const getLowestBasePrice = appFunctions.__get__("getLowestBasePrice");

  const outcome = getLowestBasePrice(inputBasePrices);
  const failOutcome = JSON.stringify(outcome) === "";
  const successOutcome =
    JSON.stringify(outcome) === JSON.stringify(inputBasePrices[0]);

  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the get lowest base price test!")
    : console.error("Failed the get lowest base price test!");

  return !failOutcome && successOutcome;
};

/**
 * Tests if option check is returning the correct value.
 *
 * @param inputCartOptions The available cart options.
 * @param inputBasePriceOptions The available base price options.
 * @param expectedOutcome The boolean we expect from our options check.
 * @returns Boolean denoting if the test passed.
 */
export const testOptionCheck = (
  inputCartOptions: CartOptions,
  inputBasePriceOptions: BasePriceOptions,
  expectedOutcome: boolean
) => {
  const optionCheck = appFunctions.__get__("optionCheck");

  const outcome = optionCheck(inputBasePriceOptions, inputCartOptions);
  const failOutcome = outcome === !expectedOutcome;
  const successOutcome = outcome === expectedOutcome;

  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the option check test!")
    : console.error("Failed the option check test!");

  return !failOutcome && successOutcome;
};
