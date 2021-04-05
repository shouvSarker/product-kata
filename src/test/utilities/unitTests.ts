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

export const testShowTotalPrice = (
  inputArguments: ConvertedJsonInput,
  expectedOutcome: string
) => {
  var logBackup = console.log;
  var logMessages: any = [];

  console.log = function () {
    logMessages.push.apply(logMessages, arguments);
    // @ts-ignore
    logBackup.apply(console, arguments);
  };

  const showTotalPrice = appFunctions.__get__("showTotalPrice");
  const evaledShowTotalPrice = eval(showTotalPrice.toString());

  // Overrides total price function call
  // @ts-ignore
  const getTotalPrice = () => 100;

  // evaluating and overriding function
  evaledShowTotalPrice(inputArguments);

  const failOutcome = `${logMessages[0]}` === "";
  const successOutcome = `${logMessages[0]}` === expectedOutcome;

  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the show total price test!")
    : console.error("Failed the show total price test!");

  return !failOutcome && successOutcome;
};

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
    options: [],
    basePrice: 20,
  });

  const outcome = evaledGetTotalPrice(inputCarts, inputBasePrices);
  const failOutcome = outcome === 0;
  const successOutcome = outcome === expectedOutcome;

  failOutcome
    ? console.error("Test is passing anyway, fail case not satisfied.")
    : console.log("Successfully asserted fail case. No boogy tests passing.");

  successOutcome
    ? console.log("Passed the get total price test!")
    : console.error("Failed the get total price test!");

  return !failOutcome && successOutcome;
};

export const testLowestBasePrice = (
  inputCarts: Cart,
  inputBasePrices: BasePrice[]
) => {
  const lowestBasePrice = appFunctions.__get__("lowestBasePrice");
  const evaledLowestBasePrice = eval(lowestBasePrice.toString());

  // @ts-ignore
  const getLowestBasePrice = (arg) => arg;
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
